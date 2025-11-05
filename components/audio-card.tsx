"use client";

import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
// import * as Tabler from "@tabler/icons-react";
import * as Tabler from "@tabler/icons-react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

type State = {
  isSingleAudioMode: boolean;
  playingIds: Set<string>;
};

type Action =
  | { type: "SET_SINGLE_MODE"; value: boolean }
  | { type: "PLAY"; id: string }
  | { type: "PAUSE"; id: string }
  | { type: "PAUSE_ALL" }
  | { type: "ENDED"; id: string };

const initialState: State = { isSingleAudioMode: false, playingIds: new Set() };

type AudioManager = {
  state: State;
  registerAudio: (id: string, el: HTMLMediaElement | null) => void;
  togglePlay: (id: string) => Promise<void>;
  play: (id: string) => Promise<void>;
  pause: (id: string) => void;
  setSingleMode: (v: boolean) => void;
  isPlaying: (id: string) => boolean;
};

const AudioContext = createContext<AudioManager | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SINGLE_MODE":
      {
        if (action.value) {
          //if the action is setting the Single Audio Mode to true, discard every playing audio except the latest one
          const lastAudio = Array.from(state.playingIds).pop();
          return {
            playingIds: new Set(lastAudio),
            isSingleAudioMode: action.value,
          };
        }
      }
      return { ...state, isSingleAudioMode: action.value };
    case "PLAY": {
      if (state.isSingleAudioMode) {
        return { ...state, playingIds: new Set([action.id]) };
      } else {
        const s = new Set(state.playingIds);
        s.add(action.id);
        return { ...state, playingIds: s };
      }
    }
    case "PAUSE": {
      const s = new Set(state.playingIds);
      s.delete(action.id);
      return { ...state, playingIds: s };
    }
    case "PAUSE_ALL":
      return { ...state, playingIds: new Set() };
    case "ENDED": {
      const s = new Set(state.playingIds);
      s.delete(action.id);
      return { ...state, playingIds: s };
    }
    default:
      return state;
  }
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // store audio elements and their 'ended' handlers
  const audioRefs = useRef<Map<string, HTMLMediaElement>>(new Map());
  const endedHandlers = useRef<Map<string, () => void>>(new Map());

  const registerAudio = useCallback(
    (id: string, el: HTMLMediaElement | null) => {
      // register element (or unregister if null)
      if (el) {
        audioRefs.current.set(id, el);

        // create and store an ended handler so we can remove it later
        const onEnded = () => {
          dispatch({ type: "ENDED", id });
        };

        // remove previous if any
        const prev = endedHandlers.current.get(id);
        if (prev) {
          // nothing to remove on the previous element here because it was removed on unregister path
          endedHandlers.current.delete(id);
        }

        el.addEventListener("ended", onEnded);
        endedHandlers.current.set(id, onEnded);
      } else {
        // unregister
        const existing = audioRefs.current.get(id);
        const handler = endedHandlers.current.get(id);
        if (existing && handler) {
          try {
            existing.removeEventListener("ended", handler);
          } catch {}
        }
        if (existing) {
          try {
            existing.pause();
          } catch {}
        }
        audioRefs.current.delete(id);
        endedHandlers.current.delete(id);
        dispatch({ type: "PAUSE", id });
      }
    },
    [],
  );

  const setSingleMode = useCallback((v: boolean) => {
    dispatch({ type: "SET_SINGLE_MODE", value: v });
  }, []);

  const isPlaying = useCallback(
    (id: string) => state.playingIds.has(id),
    [state.playingIds],
  );

  const pause = useCallback((id: string) => {
    const audio = audioRefs.current.get(id);
    if (audio && !audio.paused) {
      try {
        audio.pause();
      } catch (e) {
        console.warn("pause failed", e);
      }
    }
    dispatch({ type: "PAUSE", id });
  }, []);

  const play = useCallback(
    async (id: string) => {
      const audio = audioRefs.current.get(id);
      if (!audio) return;
      if (state.isSingleAudioMode) {
        for (const [otherId, otherAudio] of audioRefs.current.entries()) {
          if (otherId !== id && !otherAudio.paused) {
            try {
              otherAudio.pause();
            } catch (e) {
              console.warn("pause failed", e);
            }
          }
        }
      }
      try {
        const p = audio.play();
        if (p instanceof Promise) {
          await p.catch((err) => {
            console.warn("audio play rejected", err);
            return Promise.reject(err);
          });
        }
        dispatch({ type: "PLAY", id });
      } catch (err) {
        console.warn("play failed", err);
        dispatch({ type: "PAUSE", id });
      }
    },
    [state.isSingleAudioMode],
  );

  const togglePlay = useCallback(
    async (id: string) => {
      const currently = state.playingIds.has(id);
      if (currently) {
        pause(id);
      } else {
        await play(id);
      }
    },
    [pause, play, state.playingIds],
  );

  useEffect(() => {
    return () => {
      for (const audio of audioRefs.current.values()) {
        try {
          audio.pause();
        } catch {}
      }
      audioRefs.current.clear();
      endedHandlers.current.clear();
    };
  }, []);

  const value: AudioManager = {
    state,
    registerAudio,
    togglePlay,
    play,
    pause,
    setSingleMode,
    isPlaying,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export const useAudio = (): AudioManager => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};

export default function AudioCard({
  label,
  initialVolume = 50,
  icon = "IconVolume",
}: {
  label: string;
  initialVolume: number;
  icon?: string;
}) {
  /* convert icon parameter (which is currently a string) into a Lucide icon */
  const Icon = (Tabler as any)[icon] ?? Tabler.IconVolume;

  const [volume, setVolume] = useState(initialVolume);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  return (
    <Card className="w-full">
      <CardTitle className="flex justify-center">
        {Icon ? <Icon className="h-9 w-9" /> : null}
      </CardTitle>

      <CardContent className="flex flex-col items-center justify-center">
        {/* {Icon ? <Icon className="h-18 w-18" /> : null} */}
        <Label className="text-sm mb-2">{label}</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Slider
              defaultValue={[initialVolume]}
              max={100}
              min={0}
              step={1}
              onValueChange={(val) => setVolume(val[0])}
              aria-label="Volume"
              className="w-full"
            />
          </TooltipTrigger>
          <TooltipContent>{volume}%</TooltipContent>
        </Tooltip>
        <CardAction className="w-full mt-2">
          <Button
            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
            className="w-full"
          >
            {isAudioPlaying ? (
              <IconPlayerPauseFilled className="h-4 w-4" />
            ) : (
              <IconPlayerPlayFilled className="h-4 w-4" />
            )}
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
}

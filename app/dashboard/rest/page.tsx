/// From shadcn/ui
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import AudioCard from "@/components/audio-card";
import { DashboardHeader } from "@/components/dashboard-header";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useCallback, useRef, useState } from "react";
import audioList from "./audio.json";
import { CircleQuestionMark } from "lucide-react";
import { MapList } from "./DXList";

// type AudioItem = {
//     isPlaying: boolean;
//     volume: number;
//     position?: number; //current playback position in seconds
//     duration?: number; //audio duration in seconds
// };

// type Id = string;

// type AudioState = {
//     isSingleAudioMode: boolean;
//     currentSingleAudioModeId: Id | null;
//     items: Record<Id, AudioItem>;
// };

// type Action =
//     | { type: "SET_SINGLE_MODE"; value: boolean }
//     | { type: "PLAY"; id: string }
//     | { type: "PAUSE"; id: string }
//     | { type: "SET_VOLUME"; value: number; id: string };

// const initialState: AudioState = {
//     isSingleAudioMode: false,
//     currentSingleAudioModeId: null,
//     items: {},
// };

// types and states
type AudioItem = {
    isPlaying: boolean;
    volume: number;
    position?: number; //current playback position in seconds
    duration?: number; //audio duration in seconds
};

type Id = string;

// type AudioState = {
//   isSingleAudioMode: boolean;
//   //ordered history of audio with id as key
//   audioItem: MapList<Id, AudioItem>;
// };

// const initialState: AudioState = {
//   isSingleAudioMode: false,
//   audioItem: new MapList<Id, AudioItem>(),
// };

export default function Page() {
    // const audioRef = useRef<HTMLAudioElement | null>(null);
    // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    // const [currentAudio, setCurrentAudio] = useState<string[] | null>(null);
    // const [currentAudio, setCurrentAudio] = useState<Record<Id, AudioItem>>({});

    //   const [state, setState] = useState<AudioState>(initialState);

    const [state, setState] = useState<MapList<Id, AudioItem>>(new MapList());
    const [isSingleAudioMode, setIsSingleAudioMode] = useState(false);
    const [currentSingleAudioModeId, setCurrentSingleAudioModeId] =
        useState(null);

    // const [playPending, setPlayPending] = useState<Set<string>>(
    //     () => new Set()
    // ); // Set of audio IDs that are pending to be played to disable clicking buttons while waiting for audio

    // Pool of per-id audio elements for simultaneous playback
    const audioPoolRef = useRef<Map<Id, HTMLAudioElement>>(new Map());
    // Dedicated single audio element used when singleMode === true
    const singleRef = useRef<HTMLAudioElement | null>(null);

    // list of functions
    async function setSingleAudioMode(singleAudioMode: boolean) {
        // Get the current last audio ID before calling setState
        const lastAudioId = state.last()?.id;
        console.log(`Last audio id is: ${lastAudioId}`);

        // code here will run if singleAudioMode is set to on
        // If turning on single mode, pause all audio elements except the last one
        if (singleAudioMode) {
            const pausedIds: Id[] = [];

            // Pause DOM audio elements (side-effect) and collect ids we'll mark as not playing
            audioPoolRef.current.forEach((audio, id) => {
                //if the audio played is not the latest one
                if (id !== lastAudioId) {
                    try {
                        audio.pause();
                    } catch (e) {
                        // defensive: ignore pause failures
                        console.log(`Pause failed: ${e}`);
                    }
                    pausedIds.push(id);
                }
            });

            // 2) Clone the MapList into a new MapList instance (so React sees a new reference)
            const clone = new MapList<Id, AudioItem>();
            for (const { id, data } of state) {
                // shallow copy of data so we don't keep references to original objects
                clone.push(id as Id, { ...(data as AudioItem) });
            }

            // 3) Update only the nodes we paused — do NOT use push(id, ...) for existing nodes
            //    because `push` moves the node to the tail (you don't want to mutate order).
            for (const id of pausedIds) {
                const node = clone.map.get(id);
                if (node) {
                    node.data = {
                        ...(node.data as AudioItem),
                        isPlaying: false,
                    };
                } else {
                    // If node didn't exist in history for some reason, insert a sensible default
                    clone.push(id, {
                        isPlaying: false,
                        volume: 50,
                    } as Partial<AudioItem>);
                }
            }

            // 4) Single setState call with the new MapList reference and flag
            setState(clone);
            setIsSingleAudioMode(true);

            return;
        }

        // If disabling single mode, only flip the flag (no audio changes required here)
        // setState((prev) => {...prev}); // no need for this
        setIsSingleAudioMode(false);
    }

    // helper function
    function sameSrc(a: string | null | undefined, b: string) {
        if (!a) return false;
        try {
            // normalize both to absolute URLs then compare pathname+search if you want exact match
            const A = new URL(a, location.origin);
            const B = new URL(b, location.origin);
            // return A.href === B.href; // or A.pathname === B.pathname to ignore query
            return A.pathname === B.pathname;
        } catch {
            return a === b;
        }
    }

    async function playAudio(audioName: string, id: string) {
        if (playPending.has(id)) return; //early return if audio is already pending to be played

        // setPending(id, true);

        //determine what to do depending if Single Audio Mode is enabled
        if (isSingleAudioMode) {
            //if the current state is Single Audio Mode
            //use the singleRef

            //if there is no singleRef, that means nothing has been played yet (or, nothing is currently playing, with something already being played before but paused)
            if (!singleRef.current) {
                //determine if the audio is already in the pool
                const check = audioPoolRef.current.get(id);
                if (check) {
                    //if it is, set it to current audio
                    singleRef.current = check;
                } else {
                    //else, this audio hasn't been played before, so open a new track
                    const playback = new Audio(`/audio/${audioName}.mp3`); // open a new track
                    playback.preload = "metadata"; //set preload (from auto to metadata)
                    // playback.load();
                    singleRef.current = playback; //set playback

                    // add it to the pool of references as well
                    audioPoolRef.current.set(id, playback);
                }

                // optional: try to play and handle play failures
                try {
                    //play the audio
                    const playback = singleRef.current;
                    // await playback.play();
                    await safePlay(playback, id);
                } catch (err) {
                    // play may fail due to autoplay policy — handle silently or notify user
                    console.warn("playback failed:", err);
                }
                // finally {
                //     // always clear pending even on error
                //     setPending(id, false);
                // }

                // add the current audio and its id
                setState((prev) => {
                    const clone = new MapList<string, AudioItem>();
                    for (const { id: k, data } of prev) {
                        // shallow-copy each node's data so we don't accidentally share refs
                        clone.push(k as string, { ...(data as AudioItem) });
                    }

                    // update (or insert) this id's metadata without moving order
                    const node = clone.map.get(id);
                    if (node) {
                        node.data = {
                            ...(node.data as AudioItem),
                            isPlaying: true,
                            volume: node.data.volume ?? 50,
                        };
                    } else {
                        clone.push(id, {
                            isPlaying: true,
                            volume: 50,
                        } as Partial<AudioItem>);
                    }

                    return clone;
                });

                return;
            }

            // singleRef exists (something already created).
            // check if the current audio about to be played is already playing and toggle it.
            state.get(id);
            const currentSingleRef = singleRef.current;

            const src = `/audio/${audioName}.mp3`; // could also use other checks
            console.log("same source, single mode");

            // If it's exactly the same file, toggle play/pause
            if (sameSrc(currentSingleRef.src, src)) {
                console.log("same source, single mode");
                if (!currentSingleRef.paused) {
                    currentSingleRef.pause();
                    // update state: mark isPlaying false for id
                    setState((prev) => {
                        const clone = new MapList<string, AudioItem>();
                        for (const { id: k, data } of prev) {
                            // shallow-copy each node's data so we don't accidentally share refs
                            clone.push(k as string, { ...(data as AudioItem) });
                        }
                        const node = clone.map.get(id);
                        if (node)
                            node.data = {
                                ...(node.data as AudioItem),
                                isPlaying: false,
                            };
                        return clone;
                    });
                    return;
                } else {
                    try {
                        // await currentSingleRef.play();
                        await safePlay(currentSingleRef, id);
                        setState((prev) => {
                            const clone = new MapList<string, AudioItem>();
                            for (const { id: k, data } of prev) {
                                // shallow-copy each node's data so we don't accidentally share refs
                                clone.push(k as string, {
                                    ...(data as AudioItem),
                                });
                            }
                            const node = clone.map.get(id);
                            if (node)
                                node.data = {
                                    ...(node.data as AudioItem),
                                    isPlaying: true,
                                };
                            else
                                clone.push(id, { isPlaying: true, volume: 50 });
                            return clone;
                        });
                    } catch (err) {
                        console.warn("play failed", err);
                    }
                    // finally {
                    //     // always clear pending even on error
                    //     setPending(id, false);
                    // }
                    return;
                }
            }

            // else replace its src and play it:

            currentSingleRef.src = src;
            try {
                // await currentSingleRef.play();
                await safePlay(currentSingleRef, id);

                // update state: mark previous last as not playing, new id as playing
                setState((prev) => {
                    const clone = new MapList<string, AudioItem>();
                    for (const { id: k, data } of prev) {
                        // shallow-copy each node's data so we don't accidentally share refs
                        clone.push(k as string, { ...(data as AudioItem) });
                    }

                    // mark all nodes isPlaying=false except this id
                    for (const { id: k, data } of clone) {
                        const n = clone.map.get(k);
                        if (n)
                            n.data = {
                                ...(n.data as AudioItem),
                                isPlaying: k === id,
                            };
                    }
                    // ensure id node exists
                    if (!clone.has(id))
                        clone.push(id, { isPlaying: true, volume: 50 });
                    return clone;
                });
            } catch (err) {
                console.warn("playback failed:", err);
            }
            // finally {
            //     // always clear pending even on error
            //     setPending(id, false);
            // }
        }

        // by this point, the state is *not* Single Audio Mode
        const src = `/audio/${audioName}.mp3`;
        const pool = audioPoolRef.current;

        // if there's already an audio element for this id
        console.log(`Accessing audio pool element: ${id}`);
        const existing = pool.get(id);
        console.log(
            `Existing audio element: ${existing}, source: ${existing?.src}`
        );
        console.log(`Same source: ${sameSrc(existing?.src, src)}`);
        if (existing) {
            // same src -> toggle
            if (sameSrc(existing.src, src)) {
                if (!existing.paused) {
                    //if the audio element is playing (not paused)
                    existing.pause();

                    //check if the audio item is *also* the current Single Audio Mode item
                    if (singleRef.current === existing) {
                        // if so, set singleRef to the last not-null element in the pool that isn't paused
                        const lastNonPaused = Array.from(pool)
                            .reverse()
                            .find((a) => !a[1].paused);
                        const lastNonPausedAudio = lastNonPaused?.[1];
                        console.log(
                            `Setting singleRef to: ${lastNonPaused?.[0]}`
                        );
                        singleRef.current = lastNonPausedAudio ?? null; //if it can't find anything, (all are paused), set to null

                        // update state: mark isPlaying false for id
                        // setState((prev) => {
                        //     const clone = new MapList<string, AudioItem>();
                        //     for (const { id: k, data } of prev) {
                        //         // shallow-copy each node's data so we don't accidentally share refs
                        //         clone.push(k as string, {
                        //             ...(data as AudioItem),
                        //         });
                        //     }
                        //     const node = clone.map.get(id);
                        //     console.log(
                        //         "Setting isPlaying to false for id:",
                        //         id
                        //     );
                        //     if (node)
                        //         node.data = {
                        //             ...(node.data as AudioItem),
                        //             isPlaying: false,
                        //         };
                        //     return clone;
                        // });
                        // return;
                    }

                    // updateNodePlaying(id, false);
                    setState((prev) => {
                        const clone = new MapList<string, AudioItem>();
                        for (const { id: k, data } of prev) {
                            // shallow-copy each node's data so we don't accidentally share refs
                            clone.push(k as string, { ...(data as AudioItem) });
                        }
                        const node = clone.map.get(id);
                        console.log("Setting isPlaying to false for id:", id);
                        if (node)
                            node.data = {
                                ...(node.data as AudioItem),
                                isPlaying: false,
                            };
                        return clone;
                    });
                } else {
                    // if the audio element is paused
                    try {
                        // await existing.play(); //play the audio
                        safePlay(existing, id);

                        //also set singleRef to this audio element
                        singleRef.current = existing;

                        // updateNodePlaying(id, true);
                        setState((prev) => {
                            const clone = new MapList<string, AudioItem>();
                            for (const { id: k, data } of prev) {
                                // shallow-copy each node's data so we don't accidentally share refs
                                clone.push(k as string, {
                                    ...(data as AudioItem),
                                });
                            }
                            const node = clone.map.get(id);
                            if (node)
                                node.data = {
                                    ...(node.data as AudioItem),
                                    isPlaying: true,
                                };
                            return clone;
                        });
                    } catch (err) {
                        console.warn("play failed:", err);
                    }
                    // finally {
                    //     // always clear pending even on error
                    //     setPending(id, false);
                    // }
                }
                return;
            }

            // different src for same id => replace src and play
            existing.src = src;
            try {
                // await existing.play();
                safePlay(existing, id);

                //also set singleRef to this audio element
                singleRef.current = existing;

                // updateNodePlaying(id, true);
                setState((prev) => {
                    const clone = new MapList<string, AudioItem>();
                    for (const { id: k, data } of prev) {
                        // shallow-copy each node's data so we don't accidentally share refs
                        clone.push(k as string, { ...(data as AudioItem) });
                    }
                    const node = clone.map.get(id);
                    if (node)
                        node.data = {
                            ...(node.data as AudioItem),
                            isPlaying: true,
                        };
                    return clone;
                });
            } catch (err) {
                console.warn("play failed:", err);
            }
            // finally {
            //     // always clear pending even on error
            //     setPending(id, false);
            // }
            return;
        }

        //audio is not existing for Multi Audio Mode
        const playback = new Audio(src);
        playback.preload = "metadata"; //set preload (from auto to metadata)
        // playback.load();

        pool.set(id, playback);
        console.log(pool);

        try {
            //also set singleRef to this audio element
            singleRef.current = playback;

            // await playback.play();
            await safePlay(playback, id);

            // update MapList: push or set node for id
            setState((prev) => {
                // const clone = cloneMapList(prev);
                const clone = new MapList<string, AudioItem>();
                for (const { id, data } of prev)
                    clone.push(id as string, { ...(data as AudioItem) });
                clone.push(id, { isPlaying: true, volume: 50 });
                return clone;
            });
        } catch (err) {
            console.warn("play failed:", err);
        }
        //  finally {
        //     // always clear pending even on error
        //     setPending(id, false);
        // }
    }

    const onVolumeChange = useCallback(
        (id: string, volume: number) => {
            setState((prev) => {
                const clone = new MapList<string, AudioItem>();
                for (const { id, data } of prev)
                    clone.push(id as string, {
                        ...(data as AudioItem),
                    });
                const node = clone.map.get(id);
                if (node)
                    node.data = {
                        ...(node.data as AudioItem),
                        volume,
                    };
                return clone;
            });

            console.log(id);

            console.log(audioPoolRef.current.entries().toArray());
            // update the pool reference
            const poolRef = audioPoolRef.current.get(id);
            console.log(`Pool Ref Id: ${poolRef?.id}`);

            const soloRef = singleRef.current;
            console.log(`Single Ref Id: ${soloRef?.id}`);

            if (poolRef) {
                poolRef.volume = Math.max(0, Math.min(1, volume / 100));
                return;
            }

            if (soloRef?.id === id) {
                //also update the singleRef if it is also the current audio
                soloRef.volume = Math.max(0, Math.min(1, volume / 100));
            }
        },
        [audioPoolRef, singleRef, setState]
    );

    // const setPending = useCallback((id: string, pending: boolean) => {
    //     setPlayPending((prev) => {
    //         const next = new Set(prev);
    //         if (pending) {
    //             console.log("Adding id:", id);
    //             next.add(id);
    //         } else {
    //             console.log("Removing id:", id);
    //             next.delete(id);
    //         }
    //         return next;
    //     });
    // }, []);

    let playPending = new Map<string, boolean>();

    async function safePlay(el: HTMLAudioElement, id: string) {
        if (playPending.get(id)) return;
        playPending.set(id, true);
        try {
            await el.play();
        } catch (err) {
            console.warn("play failed", err);
        } finally {
            playPending.set(id, false);
        }
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
            defaultOpen={false}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <DashboardHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Switch
                                id="single-audio-mode"
                                onClick={
                                    // () => setIsSingleAudioMode(!isSingleAudioMode)
                                    () => setSingleAudioMode(!isSingleAudioMode)
                                }
                            />
                            <Tooltip>
                                <TooltipTrigger>
                                    <Label htmlFor="single-audio-mode">
                                        Single Audio Mode
                                    </Label>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Play a single audio track at a time.</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleQuestionMark />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="w-40 text-xs">
                                        Enabling this while playing multiple
                                        audio tracks will pause all other audio
                                        tracks except the latest one playing.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        {/* added px-2 */}
                        <div className="grid grid-cols-4 gap-4 py-4 px-4 md:grid-cols-9 md:gap-6 md:py-6 justify-center items-center">
                            {/* put context here*/}
                            {audioList.map((audio) => {
                                const audioName = audio.src
                                    .split("/")
                                    .pop()!
                                    .split(".")[0]; //extract "thunder2" from "/audio/thunder2.mp3"
                                return (
                                    <AudioCard
                                        // supply the context here somewhere
                                        key={audio.id}
                                        id={audio.id}
                                        label={audio.label}
                                        audioName={audioName}
                                        initialVolume={50}
                                        volume={state.get(audio.id)?.volume}
                                        onVolumeChange={onVolumeChange}
                                        icon={audio.icon}
                                        onTogglePlay={playAudio}
                                        isAudioPlaying={
                                            state.get(audio.id)?.isPlaying
                                        }
                                        disabled={playPending.get(audio.id)}
                                    />
                                );
                            })}
                            {/*
                                <ButtonGroup>
                                  <Button onClick={() => playAudio("ocean1")}>Ocean 1</Button>
                                  <ButtonGroupSeparator />
                                  <Button onClick={() => playAudio("ocean2")}>Ocean 2</Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                  <Button onClick={() => playAudio("thunder1")}>Thunder 1</Button>
                                  <ButtonGroupSeparator />
                                  <Button onClick={() => playAudio("thunder2")}>Thunder 2</Button>
                                </ButtonGroup>
                                <Button onClick={() => playAudio("airplane")}>Airplane</Button>
                                <Button onClick={() => playAudio("cafe1")}>Cafe</Button>
                                <Button onClick={() => playAudio("cicadas")}>Cicadas</Button>
                                <Button onClick={() => playAudio("dryer")}>Dryer</Button>
                                <Button onClick={() => playAudio("fireplace1")}>Fireplace</Button>
                                <Button onClick={() => playAudio("fountain")}>
                                  Fountain (Fontaine)
                                </Button>
                                <Button onClick={() => playAudio("rain1")}>Rain</Button>
                                <Button onClick={() => playAudio("whitenoise1")}>
                                  White Noise
                                </Button>
                                */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

"use client";

import { useEffect, useMemo, useState } from "react";
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

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

type Props = {
  id: string;
  audioName: string;
  label: string;
  icon?: string;
  volume?: number; // controlled volume (0-100)
  isAudioPlaying?: boolean; // controlled playing flag
  disabled?: boolean;
  onTogglePlay: (audioName: string, id: string) => void;
  onVolumeChange?: (id: string, volume: number) => void;
};

export default function AudioCard({
  id,
  audioName,
  label,
  initialVolume = 50,
  icon = "Volume", //IconName
  volume = initialVolume,
  isAudioPlaying = false,
  disabled = false,
  onTogglePlay,
  onVolumeChange,
}: Props & { initialVolume?: number }) {
  /* convert icon parameter (which is currently a string) into a Tabler icon */
  // Tabler icons have a format of "IconName", like "IconPlane"
  const iconName = `Icon${icon}`;
  const Icon = (Tabler as any)[iconName] ?? Tabler.IconVolume;

  // const [volume, setVolume] = useState(initialVolume);

  // local UI-only state for slider preview (optional)
  const [localVolume, setLocalVolume] = useState<number>(volume);

  // const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // sync controlled volume -> localVolume
  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);
  return (
    <Card className="w-full">
      <CardTitle className="flex justify-center">
        {Icon ? <Icon className="h-9 w-9" /> : null}
      </CardTitle>

      <CardContent className="flex flex-col items-center justify-center">
        {/* {Icon ? <Icon className="h-18 w-18" /> : null} */}
        <Label className="text-sm text-center mb-2">{label}</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Slider
              defaultValue={[
                // initialVolume
                localVolume,
              ]}
              max={100}
              min={0}
              step={1}
              // onValueChange={(val) => setVolume(val[0])}
              aria-label="Volume"
              className="w-full"
              onValueChange={(val) => {
                const v = val[0];
                setLocalVolume(v);
                onVolumeChange?.(id, v);
              }}
            />
          </TooltipTrigger>
          <TooltipContent>{volume}%</TooltipContent>
        </Tooltip>
        <CardAction className="w-full mt-2">
          <Button
            onClick={
              // () => setIsAudioPlaying(!isAudioPlaying)
              () => onTogglePlay(audioName, id)
            }
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

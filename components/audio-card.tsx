"use client";

import { useMemo, useState } from "react";
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


export default function AudioCard({
    label,
    initialVolume = 50,
    icon = "Volume", //IconName
}: {
    label: string;
    initialVolume: number;
    icon?: string;
}) {
    /* convert icon parameter (which is currently a string) into a Tabler icon */
    // Tabler icons have a format of "IconName", like "IconPlane"
    const iconName = `Icon${icon}`;
    const Icon = (Tabler as any)[iconName] ?? Tabler.IconVolume;

    
    const [volume, setVolume] = useState(initialVolume);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
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
                            defaultValue={[initialVolume]}
                            max={100}
                            min={0}
                            step={1}
                            // onValueChange={(val) => setVolume(val[0])}
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

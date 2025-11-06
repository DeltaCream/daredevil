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
import React, { useRef, useState } from "react";
import audioList from "./audio.json";
import { CircleQuestionMark } from "lucide-react";

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

export default function Page() {
    // const audioRef = useRef<HTMLAudioElement | null>(null);
    // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    // const [currentAudio, setCurrentAudio] = useState<string[] | null>(null);
    const [currentAudio, setCurrentAudio] = useState<Record<Id, AudioItem>>({});
    const [isSingleAudioMode, setIsSingleAudioMode] = useState(false);
    const [currentSingleAudioModeId, setCurrentSingleAudioModeId] =
        useState(null);

    // Pool of per-id audio elements for simultaneous playback
    const audioPoolRef = useRef<Map<Id, HTMLAudioElement>>(new Map());
    // Dedicated single audio element used when singleMode === true
    const singleRef = useRef<HTMLAudioElement | null>(null);

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
                                onClick={() =>
                                    setIsSingleAudioMode(!isSingleAudioMode)
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
                                return (
                                    <AudioCard
                                        // supply the context here somewhere
                                        key={audio.id}
                                        label={audio.label}
                                        initialVolume={50}
                                        icon={audio.icon}
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

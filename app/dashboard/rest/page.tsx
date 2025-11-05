/// From shadcn/ui
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import AudioCard from "@/components/audio-card";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
    ButtonGroup,
    ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import * as Lucide from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import audioList from "./audio.json";

export default function Page() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState<string | null>(null);
    const [isSingleAudioMode, setIsSingleAudioMode] = useState(false);

    async function playAudio(audioName: string) {
        //if there is no audioRef, that means nothing has been played yet
        if (!audioRef.current) {
            const playback = new Audio(`/audio/${audioName}.mp3`); //open a new track
            playback.preload = "auto";
            audioRef.current = playback;
            setCurrentAudio(audioName);
            setIsAudioPlaying(true);
            //play the audio
            try {
                await audioRef?.current?.play();
            } catch (err) {
                console.error(`Playing ${audioName} failed:`, err);
            }
            return;
        }
        //if it passes this point, this means there is an audio file being played

        //check if the audio about to be played is the same as the one currently being played
        if (currentAudio == audioName) {
            //if it is, toggle the track
            try {
                if (isAudioPlaying) {
                    //if audio is playing, pause it
                    setIsAudioPlaying(false);
                    audioRef?.current?.pause();
                } else {
                    // else, the audio is not playing, which means you should play it
                    setIsAudioPlaying(true);
                    await audioRef?.current?.play();
                }
            } catch (err) {
                //catch for any errors
                if (isAudioPlaying) {
                    console.error(`Pausing ${audioName} failed:`, err);
                } else {
                    console.error(`Playing ${audioName} failed:`, err);
                }
            }
            return;
        }

        // if it passes this point, this means two things:
        // 1. there is an audio playing
        // 2. the audio about to be played is different from the current one being played
        // in this case, do the following depending if single-audio mode is enabled:
        // 1. if single-audio mode is enabled, stop the current audio being played, and switch playback to this audio
        // 2. if single-audio mode is disabled, leave the current audio alone, and add this audio to the list of audios being played (essentially overlaying it on top of the current audio)
        if (isSingleAudioMode) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; //reset time back to 0, essentially stopping the audio
            const playback = new Audio(`/audio/${audioName}.mp3`);
            playback.preload = "auto";
            audioRef.current = playback;
            setCurrentAudio(audioName);
            setIsAudioPlaying(true);
            try {
                await audioRef?.current?.play();
            } catch (err) {
                console.error(`Playing ${audioName} failed:`, err);
            }
        } else {
            const playback = new Audio(`/audio/${audioName}.mp3`);
            playback.preload = "auto";
            audioRef.current = playback;
            setCurrentAudio(audioName);
            setIsAudioPlaying(true);
            try {
                await audioRef?.current?.play();
            } catch (err) {
                console.error(`Playing ${audioName} failed:`, err);
            }
        }
    }

    //cleanup
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

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
                        <div className="flex items-center">
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
                        </div>
                        {/* added px-2 */}
                        <div className="grid grid-cols-4 gap-4 py-4 px-4 md:grid-cols-9 md:gap-6 md:py-6 justify-center items-center">
                            {audioList.map((audio) => {
                                return (
                                    <AudioCard
                                        key={audio.id}
                                        label={audio.label}
                                        initialVolume={50}
                                        icon={audio.icon}
                                    />
                                );
                            })}
                            <ButtonGroup>
                                <Button onClick={() => playAudio("ocean1")}>
                                    Ocean 1
                                </Button>
                                <ButtonGroupSeparator />
                                <Button onClick={() => playAudio("ocean2")}>
                                    Ocean 2
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button onClick={() => playAudio("thunder1")}>
                                    Thunder 1
                                </Button>
                                <ButtonGroupSeparator />
                                <Button onClick={() => playAudio("thunder2")}>
                                    Thunder 2
                                </Button>
                            </ButtonGroup>
                            <Button onClick={() => playAudio("airplane")}>
                                Airplane
                            </Button>
                            <Button onClick={() => playAudio("cafe1")}>
                                Cafe
                            </Button>
                            <Button onClick={() => playAudio("cicadas")}>
                                Cicadas
                            </Button>
                            <Button onClick={() => playAudio("dryer")}>
                                Dryer
                            </Button>
                            <Button onClick={() => playAudio("fireplace1")}>
                                Fireplace
                            </Button>
                            <Button onClick={() => playAudio("fountain")}>
                                Fountain (Fontaine)
                            </Button>
                            <Button onClick={() => playAudio("rain1")}>
                                Rain
                            </Button>
                            <Button onClick={() => playAudio("whitenoise1")}>
                                White Noise
                            </Button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

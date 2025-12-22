// async function playAudio(audioName: string) {
//         //if there is no audioRef, that means nothing has been played yet
//         if (!audioRef.current) {
//             const playback = new Audio(`/audio/${audioName}.mp3`); //open a new track
//             playback.preload = "auto";
//             audioRef.current = playback;
//             setCurrentAudio((prev) =>
//                 prev ? [...prev, audioName] : [audioName]
//             );
//             setIsAudioPlaying(true);
//             //play the audio
//             try {
//                 await audioRef?.current?.play();
//             } catch (err) {
//                 console.error(`Playing ${audioName} failed:`, err);
//             }
//             return;
//         }
//         //if it passes this point, this means there is an audio file being played

//         //check if the audio about to be played is the same as the one currently being played
//         if (currentAudio?.includes(audioName)) {
//             //if it is, toggle the track
//             try {
//                 if (isAudioPlaying) {
//                     //if audio is playing, pause it
//                     setIsAudioPlaying(false);
//                     audioRef?.current?.pause();
//                 } else {
//                     // else, the audio is not playing, which means you should play it
//                     setIsAudioPlaying(true);
//                     await audioRef?.current?.play();
//                 }
//             } catch (err) {
//                 //catch for any errors
//                 if (isAudioPlaying) {
//                     console.error(`Pausing ${audioName} failed:`, err);
//                 } else {
//                     console.error(`Playing ${audioName} failed:`, err);
//                 }
//             }
//             return;
//         }

//         // if it passes this point, this means two things:
//         // 1. there is an audio playing
//         // 2. the audio about to be played is different from the current one being played
//         // in this case, do the following depending if single-audio mode is enabled:
//         // 1. if single-audio mode is enabled, stop the current audio being played, and switch playback to this audio
//         // 2. if single-audio mode is disabled, leave the current audio alone, and add this audio to the list of audios being played (essentially overlaying it on top of the current audio)
//         if (isSingleAudioMode) {
//             audioRef.current.pause();
//             audioRef.current.currentTime = 0; //reset time back to 0, essentially stopping the audio
//             const playback = new Audio(`/audio/${audioName}.mp3`);
//             playback.preload = "auto";
//             audioRef.current = playback;
//             setCurrentAudio([audioName]);
//             setIsAudioPlaying(true);
//             try {
//                 await audioRef?.current?.play();
//             } catch (err) {
//                 console.error(`Playing ${audioName} failed:`, err);
//             }
//         } else {
//             const playback = new Audio(`/audio/${audioName}.mp3`);
//             playback.preload = "auto";
//             audioRef.current = playback;
//             setCurrentAudio((prev) =>
//                 prev ? [...prev, audioName] : [audioName]
//             );
//             setIsAudioPlaying(true);
//             try {
//                 await audioRef?.current?.play();
//             } catch (err) {
//                 console.error(`Playing ${audioName} failed:`, err);
//             }
//         }
//     }

//     //cleanup
//     useEffect(() => {
//         return () => {
//             if (audioRef.current) {
//                 audioRef.current.pause();
//                 audioRef.current = null;
//             }
//         };
//     }, []);

// // ---------

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

// // type State = {
// //   isSingleAudioMode: boolean;
// //   playingIds: Set<string>;
// // };

// // use this if using a reducer function
// type Action =
//   | { type: "SET_SINGLE_MODE"; value: boolean }
//   | { type: "PLAY"; id: string }
//   | { type: "PAUSE"; id: string }
//   | { type: "PAUSE_ALL" }
//   | { type: "ENDED"; id: string };

// // const initialState: State = { isSingleAudioMode: false, playingIds: new Set() };
// const initialState: AudioState = {
//     isSingleAudioMode: false,
//     currentSingleAudioModeId: null,
//     items: {},
// };

// type AudioManager = {
//     state: AudioState;
//     // registerAudio: (id: string, el: HTMLMediaElement | null) => void;
//     add: (id: Id, src: string) => void;
//     // togglePlay: (id: string) => Promise<void>;
//     toggle: (id: Id) => Promise<void>;
//     // play: (id: string) => Promise<void>;
//     play: (id: Id) => Promise<void>;
//     // pause: (id: string) => void;
//     pause: (id: Id) => void;
//     // setSingleMode: (v: boolean) => void;
//     setSingleAudioMode: (on: boolean) => void;
//     // isPlaying: (id: string) => boolean;
//     setVolume: (id: Id, v: number) => void;
// };

// const AudioContext = createContext<AudioManager | undefined>(undefined);

// // const AudioContext = createContext<AudioState | undefined>(undefined);

// // function reducer(state: State, action: Action): State {
// //   switch (action.type) {
// //     case "SET_SINGLE_MODE":
// //       {
// //         if (action.value) {
// //           //if the action is setting the Single Audio Mode to true, discard every playing audio except the latest one
// //           const lastAudio = Array.from(state.playingIds).pop();
// //           return {
// //             playingIds: new Set(lastAudio),
// //             isSingleAudioMode: action.value,
// //           };
// //         }
// //       }
// //       return { ...state, isSingleAudioMode: action.value };
// //     case "PLAY": {
// //       if (state.isSingleAudioMode) {
// //         return { ...state, playingIds: new Set([action.id]) };
// //       } else {
// //         const s = new Set(state.playingIds);
// //         s.add(action.id);
// //         return { ...state, playingIds: s };
// //       }
// //     }
// //     case "PAUSE": {
// //       const s = new Set(state.playingIds);
// //       s.delete(action.id);
// //       return { ...state, playingIds: s };
// //     }
// //     case "PAUSE_ALL":
// //       return { ...state, playingIds: new Set() };
// //     case "ENDED": {
// //       const s = new Set(state.playingIds);
// //       s.delete(action.id);
// //       return { ...state, playingIds: s };
// //     }
// //     default:
// //       return state;
// //   }
// // }

// export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     // const [state, dispatch] = useReducer(reducer, initialState); //use this if using a reducer
//     const [state, setState] = useState<AudioState>({
//         isSingleAudioMode: true,
//         currentSingleAudioModeId: null,
//         items: {},
//     });

//     // Pool of per-id audio elements for simultaneous playback
//     const audioPoolRef = useRef<Map<Id, HTMLAudioElement>>(new Map());
//     // Dedicated single audio element used when singleMode === true
//     const singleRef = useRef<HTMLAudioElement | null>(null);

//     // create single audio element once
//     useEffect(() => {
//         const audio = new Audio();
//         audio.preload = "metadata";
//         singleRef.current = audio;
//         // cleanup
//         return () => {
//             audio.pause();
//             audio.src = "";
//             singleRef.current = null;
//         };
//     }, []);

//     // const registerAudio = useCallback(
//     //   (id: string, el: HTMLMediaElement | null) => {
//     //     // register element (or unregister if null)
//     //     if (el) {
//     //       audioRefs.current.set(id, el);

//     //       // create and store an ended handler so we can remove it later
//     //       const onEnded = () => {
//     //         dispatch({ type: "ENDED", id });
//     //       };

//     //       // remove previous if any
//     //       const prev = endedHandlers.current.get(id);
//     //       if (prev) {
//     //         // nothing to remove on the previous element here because it was removed on unregister path
//     //         endedHandlers.current.delete(id);
//     //       }

//     //       el.addEventListener("ended", onEnded);
//     //       endedHandlers.current.set(id, onEnded);
//     //     } else {
//     //       // unregister
//     //       const existing = audioRefs.current.get(id);
//     //       const handler = endedHandlers.current.get(id);
//     //       if (existing && handler) {
//     //         try {
//     //           existing.removeEventListener("ended", handler);
//     //         } catch {}
//     //       }
//     //       if (existing) {
//     //         try {
//     //           existing.pause();
//     //         } catch {}
//     //       }
//     //       audioRefs.current.delete(id);
//     //       endedHandlers.current.delete(id);
//     //       dispatch({ type: "PAUSE", id });
//     //     }
//     //   },
//     //   [],
//     // );
//     const add = useCallback((id: Id, src: string) => {
//         if (audioPoolRef.current.has(id)) return;
//         const audio = new Audio(src);
//         audio.preload = "metadata"; //preload metadata
//         audio.addEventListener("ended", () => {
//             setState((prev) => {
//                 const it = prev.items[id];
//                 if (!it) return prev;
//                 return {
//                     ...prev,
//                     items: {
//                         ...prev.items,
//                         [id]: { ...it, isPlaying: false, position: 0 },
//                     },
//                 };
//             });
//         });
//         audioPoolRef.current.set(id, audio);
//         setState((prev) => ({
//             ...prev,
//             items: { ...prev.items, [id]: { isPlaying: false, volume: 50 } },
//         }));
//     }, []);

//     // const setSingleMode = useCallback((v: boolean) => {
//     //   dispatch({ type: "SET_SINGLE_MODE", value: v });
//     // }, []);

//     const setSingleAudioMode = useCallback((on: boolean) => {
//         setState((prev) => ({ ...prev, isSingleAudioMode: on }));
//         if (on) {
//             //if setSingleAudioMode is true
//             //disable all other audio elements besides the latest one
//             audioPoolRef.current.forEach((audio, id) => {
//                 if (id !== state.currentSingleAudioModeId) {
//                     //if the audio played is not the latest one
//                     audio.pause(); //pause the audio
//                     setState((prev) => ({
//                         //setState
//                         ...prev,
//                         items: {
//                             // update the items object to disable the audio
//                             ...prev.items,
//                             [id]: {
//                                 ...(prev.items[id] ?? { volume: 50 }),
//                                 isPlaying: false,
//                             },
//                         },
//                     }));
//                 }
//             });
//             // audioPoolRef.current.forEach(el => el.pause());
//         }
//     }, []);

//     // const isPlaying = useCallback(
//     //   (id: string) => state.playingIds.has(id),
//     //   [state.playingIds],
//     // );

//     // const pause = useCallback((id: string) => {
//     //   const audio = audioRefs.current.get(id);
//     //   if (audio && !audio.paused) {
//     //     try {
//     //       audio.pause();
//     //     } catch (e) {
//     //       console.warn("pause failed", e);
//     //     }
//     //   }
//     //   dispatch({ type: "PAUSE", id });
//     // }, []);
//     const pause = useCallback((id: Id) => {
//         const audio = audioPoolRef.current.get(id);
//         if (!audio) return;
//         audio.pause();
//         setState((prev) => ({
//             ...prev,
//             items: {
//                 ...prev.items,
//                 [id]: {
//                     ...(prev.items[id] ?? { volume: 50 }),
//                     isPlaying: false,
//                 },
//             },
//         }));
//     }, []);

//     // const play = useCallback(
//     //   async (id: string) => {
//     //     const audio = audioRefs.current.get(id);
//     //     if (!audio) return;
//     //     if (state.isSingleAudioMode) {
//     //       for (const [otherId, otherAudio] of audioRefs.current.entries()) {
//     //         if (otherId !== id && !otherAudio.paused) {
//     //           try {
//     //             otherAudio.pause();
//     //           } catch (e) {
//     //             console.warn("pause failed", e);
//     //           }
//     //         }
//     //       }
//     //     }
//     //     try {
//     //       const p = audio.play();
//     //       if (p instanceof Promise) {
//     //         await p.catch((err) => {
//     //           console.warn("audio play rejected", err);
//     //           return Promise.reject(err);
//     //         });
//     //       }
//     //       dispatch({ type: "PLAY", id });
//     //     } catch (err) {
//     //       console.warn("play failed", err);
//     //       dispatch({ type: "PAUSE", id });
//     //     }
//     //   },
//     //   [state.isSingleAudioMode],
//     // );
//     const play = useCallback(async (id: Id) => {
//         const audio = audioPoolRef.current.get(id);
//         if (!audio) return;
//         try {
//             await audio.play();
//             setState((prev) => ({
//                 ...prev,
//                 items: {
//                     ...prev.items,
//                     [id]: {
//                         ...(prev.items[id] ?? { volume: 50 }),
//                         isPlaying: true,
//                     },
//                 },
//             }));
//         } catch (e) {
//             console.warn("play failed", e);
//         }
//     }, []);

//     // const togglePlay = useCallback(
//     //   async (id: string) => {
//     //     const currently = state.playingIds.has(id);
//     //     if (currently) {
//     //       pause(id);
//     //     } else {
//     //       await play(id);
//     //     }
//     //   },
//     //   [pause, play, state.playingIds],
//     // );
//     const toggle = useCallback(
//         //convenience function that handles both play and pause
//         async (id: Id) => {
//             const it = state.items[id];
//             if (it?.isPlaying) pause(id);
//             else await play(id);
//         },
//         [pause, play, state.items]
//     );

//     // useEffect(() => {
//     //   return () => {
//     //     for (const audio of audioRefs.current.values()) {
//     //       try {
//     //         audio.pause();
//     //       } catch {}
//     //     }
//     //     audioRefs.current.clear();
//     //     endedHandlers.current.clear();
//     //   };
//     // }, []);

//     const setVolume = useCallback((id: Id, v: number) => {
//         const el = audioPoolRef.current.get(id);
//         if (el) el.volume = v;
//         setState((prev) => ({
//             ...prev,
//             items: {
//                 ...prev.items,
//                 [id]: {
//                     ...(prev.items[id] ?? { isPlaying: false }),
//                     volume: v,
//                 },
//             },
//         }));
//     }, []);

//     // const value: AudioManager = {
//     //   state,
//     //   registerAudio,
//     //   togglePlay,
//     //   play,
//     //   pause,
//     //   setSingleMode,
//     //   isPlaying,
//     // };

//     // memoize the context value so `add/play/pause/...` functions keep identity
//     const value = useMemo(
//         () => ({
//             state,
//             add,
//             play,
//             pause,
//             toggle,
//             setVolume,
//             setSingleAudioMode,
//         }),
//         [state, add, play, pause, toggle, setVolume, setSingleAudioMode]
//     );

//     return (
//         <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
//     );
// };

// export const useAudio = (): AudioManager => {
//     const ctx = useContext(AudioContext);
//     if (!ctx) throw new Error("useAudio must be used within AudioProvider");
//     return ctx;
// };

// ----------

// const { state, add, play, pause, toggle, setVolume, setSingleAudioMode } = useAudio();
//     const volume = state.items[id]?.volume ?? initialVolume;

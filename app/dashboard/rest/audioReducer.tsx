// import { produce, Draft } from "immer";

// type AudioItem = {
//   isPlaying: boolean;
//   volume: number;
//   position?: number; //current playback position in seconds
//   duration?: number; //audio duration in seconds
// };

// type Id = string;

// type AudioState = {
//   isSingleAudioMode: boolean;
//   //ordered history of audio with id as key
//   audioItem: MapList<Id, AudioItem>;
// };

// type Action =
//   | { type: "SET_SINGLE_AUDIO_MODE"; value: boolean }
//   | { type: "PLAY"; id: string }
//   | { type: "PAUSE"; id: string }
//   | { type: "TOGGLE"; id: string }
//   | { type: "SET_VOLUME"; value: number; id: string };

// const initialState: AudioState = {
//   isSingleAudioMode: false,
//   audioItem: new MapList<Id, AudioItem>(),
// };

// // const audioState = new OrderedHistory<string, AudioItem>();

// function reducer(state: AudioState, action: Action): AudioState {
//   return produce(state, (draft: Draft<AudioState>) => {
//     switch (action.type) {
//       case "SET_SINGLE_AUDIO_MODE":
//         {
//           if (action.value) {
//             //if the action is setting the Single Audio Mode to true, discard every playing audio except the latest one
//             // const lastAudio = state.currentSingleAudioModeId;
//             // for (const id in state.items) {
//             //   if (id !== lastAudio) {
//             //     state.items[id].isPlaying = false;
//             //   }
//             // }
//             const lastAudioId = state.audioItem.last()?.id;
//             for (const id in state.audioItem.toArray()) {
//               if (id !== lastAudioId) {
//                 const existing = draft.audioItem.get(id);
//                 draft.audioItem.get(id) = { ...(existing ?? { isPlaying: false, volume: 50 })}
//               }
//             }
//           }
//         }
//         return { ...state, isSingleAudioMode: action.value };
//       case "PLAY": {
//         //check if there is already an audio playing
//         if (!state.currentSingleAudioModeId) {
//           //if not, set it
//           state.currentSingleAudioModeId = action.id;
//         }

//         //check if the audio item is already added in the state
//         if (!state.items[action.id]) {
//           //if not, add it
//           state.items[action.id] = {
//             isPlaying: false,
//             volume: 50,
//           };
//         }

//         //check if the action is setting the Single Audio Mode to true
//         if (state.isSingleAudioMode) {
//           // if so, discard the previous audio
//           state.items[action.id].isPlaying = true; //set the new audio as playing
//           for (const id in state.items) {
//             //set the other audios as not playing
//             if (id !== action.id) {
//               state.items[id].isPlaying = false;
//             }
//           }
//           return { ...state, currentSingleAudioModeId: action.id };
//         } else {
//           const s = new Set(state.playingIds);
//           s.add(action.id);
//           return { ...state, playingIds: s };
//         }
//       }
//       case "PAUSE": {
//         if (state.currentSingleAudioModeId === action.id) {
//           state.currentSingleAudioModeId = null;
//         }
//         state.items[action.id].isPlaying = false;
//         return { ...state, currentSingleAudioModeId: null }; //set the audio corresponding to Single Audio Mode playing id to false
//       }
//       // case "TOGGLE": {
//       //   state.items[action.id].isPlaying = !state.items[action.id].isPlaying;
//       //   return { ...state };
//       // }
//       case "SET_VOLUME": {
//         state.audioItem.get([action.id])?.volume = action.value;
//         return { ...state };
//       }
//       default:
//         return state;
//     }
//   });
// }

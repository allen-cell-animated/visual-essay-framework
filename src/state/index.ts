import { initialState as quizAnswerInitialState } from "./quizAnswer/reducer";
import { initialState as selectionsInitialState } from "./selection/reducer";
import { initialState as simDataInitialState } from "./simdata/reducer";

import { State } from "./types";

export const initialState: State = Object.freeze({
    simdata: simDataInitialState,
    quizAnswer: quizAnswerInitialState,
    selection: selectionsInitialState,
});

export { default as simdata } from "./simdata";
export { default as quizAnswer } from "./quizAnswer";
export { default as selection } from "./selection";
export { default as createReduxStore } from "./configure-store";
export { enableBatching } from "./util";
export { State } from "./types";

import { AnyAction } from "redux";

import { TypeToDescriptionMap } from "../types";
import { makeReducer } from "../util";

import { SAVE_ANSWER, CLEAR_ANSWER } from "./constants";
import { QuizAnswerStateBranch, SaveQuestionAction, ClearQuestionAction } from "./types";

export const initialState = {};

const actionToConfigMap: TypeToDescriptionMap = {
    [SAVE_ANSWER]: {
        accepts: (action: AnyAction): action is SaveQuestionAction => action.type === SAVE_ANSWER,
        perform: (state: QuizAnswerStateBranch, action: QuizAnswerStateBranch) => ({
            ...state,
            [action.key]: action.payload,
        }),
    },
    [CLEAR_ANSWER]: {
        accepts: (action: AnyAction): action is ClearQuestionAction => action.type === CLEAR_ANSWER,
        perform: (state: QuizAnswerStateBranch, action: QuizAnswerStateBranch) => ({
            ...state,
            [action.payload]: "",
        }),
    },
};

export default makeReducer<QuizAnswerStateBranch>(actionToConfigMap, initialState);

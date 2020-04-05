import { SAVE_ANSWER, CLEAR_ANSWER } from "./constants";
import { SaveQuestionAction, Answer } from "./types";

export function saveAnswer(key: string, payload: Answer): SaveQuestionAction {
    return {
        key,
        payload,
        type: SAVE_ANSWER,
    };
}

export function clearAnswer(payload: string) {
    return {
        payload,
        type: CLEAR_ANSWER,
    };
}

import { createLogic } from "redux-logic";
import { SAVE_ANSWER } from "./constants";
import { AnyAction } from "redux";
import { SaveQuestionAction } from "./types";

const saveAnswerInLocalStorage = createLogic({
    processOptions: {
        successType: SAVE_ANSWER,
    },
    process({ action }) {
        const isSaveAction = (action: AnyAction): action is SaveQuestionAction =>
            action.type === SAVE_ANSWER;

        if (isSaveAction(action)) {
            const quiz = localStorage.getItem("quiz") || "{}";
            const currentAnswers = JSON.parse(quiz);
            const newAnswers = {
                ...currentAnswers,
                [action.key]: action.payload,
            };
            localStorage.setItem("quiz", JSON.stringify(newAnswers));
        }
    },
    type: SAVE_ANSWER,
});

export default [saveAnswerInLocalStorage];

import { createSelector } from "reselect";

import { State } from "../types";

import { QuizAnswerStateBranch } from "./types";

// BASIC SELECTORS
export const getQuizAnswers = (state: State) => state.quizAnswer;

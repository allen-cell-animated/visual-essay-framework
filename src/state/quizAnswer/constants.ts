import { makeConstant } from "../util";

const STATE_BRANCH_NAME = "quizAnswer";

export const RECIEVE_ANSWER = makeConstant(STATE_BRANCH_NAME, "receive");
export const SAVE_ANSWER = makeConstant(STATE_BRANCH_NAME, "save_answer");
export const CLEAR_ANSWER = makeConstant(STATE_BRANCH_NAME, "clear_answer");

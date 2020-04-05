import { QuizAnswerStateBranch } from "../quizAnswer/types";

export interface SelectMetadataAction {
    key: keyof QuizAnswerStateBranch;
    payload: string | number;
    type: string;
}

export interface SelectionStateBranch {
    [key: string]: any;
}

export interface TurnAgentsOnAction {
    payload: string[];
    type: string;
}

export interface ChangeTimeAction {
    payload: number;
    type: string;
}

export interface ChangeNumberCollapsedPanelsAction {
    payload: number;
    type: string;
}

export interface HighlightAgentAction {
    payload: string;
    type: string;
}

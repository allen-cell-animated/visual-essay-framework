export interface QuizAnswerStateBranch {
    [key: string]: any;
}

export interface Question {
    question: string;
    choices: string[];
    renderType: string;
    name: string;
    helpText?: string;
    answer: string | string[];
    answerCheck: (answer: any) => boolean;
    contentType: string;
    hypothesisKey?: string;
}

export interface Answer {
    userSelection: string | string[];
    correct: boolean;
    answer: string | string[];
    answerText?: string;
}

export interface SaveQuestionAction {
    key: string;
    payload: Answer;
    type: string;
}

export interface ClearQuestionAction {
    payload: string;
    type: string;
}

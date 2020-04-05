import { charCodeStart, OBSERVE, REFLECT } from "../constants";

const baseQuestion = {
    choices: [],
    answer: "",
    showAnswer: true,
    contentType: "base",
    answerCheck: function(answer: string) {
        return answer === this.answer;
    },
};

export const formatQuestions = (questions: any[], sectionNo: number) => {
    return questions.map((question, index) => {
        let hypothesisKey = null;

        if (question.contentType === OBSERVE) {
            //if a question is an observation, the question before it was the coorrpsonding Hypothesis prompt
            hypothesisKey = `S${sectionNo}_Q${index}`;
        } else if (question.contentType === REFLECT) {
            //if a question is an reflection, the question before it was the coorrpsonding Hypothesis prompt
            hypothesisKey = `S${sectionNo}_Q${index - 1}`;
        }

        const formattedQuestion = {
            ...baseQuestion,
            ...question,
            name: `S${sectionNo}_Q${index + 1}`,
            hypothesisKey,
        };
        formattedQuestion.answerCheck = formattedQuestion.answerCheck.bind(formattedQuestion);
        return formattedQuestion;
    });
};

export const indexToLetter = (index: number) => {
    return String.fromCharCode(charCodeStart + index);
};

export const letterToIndex = (letter: string) => {
    return letter.charCodeAt(0) - charCodeStart;
};

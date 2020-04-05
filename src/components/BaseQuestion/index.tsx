import * as React from "react";

import RadioGroup from "../uiLibrary/RadioGroup";
import CheckBoxGroup from "../uiLibrary/CheckBoxGroup";
import { CHECKBOX_GROUP, RADIO_GROUP } from "../../constants";

export interface BaseQuestionProps {
    answer: string | string[];
    question: string;
    choices: string[];
    renderType: string;
    name: string;
    helpText?: string;
    answerCheck: (answer: any) => boolean;
    showAnswer: boolean;
    onChange: (answer: string | string[]) => void;
    answered: boolean;
    toggleSubmitButtonActive: (value: boolean) => void;
    optionImages?: string[];
    questionImage?: string;
}

export default class BaseQuestion extends React.Component<BaseQuestionProps> {
    constructor(props: BaseQuestionProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value: string | string[]) {
        const { toggleSubmitButtonActive, onChange, answered } = this.props;
        if (value && !answered) {
            toggleSubmitButtonActive(true);
        }

        onChange(value);
    }

    renderInput() {
        const {
            answered,
            renderType,
            name,
            choices,
            children,
            answerCheck,
            showAnswer,
            answer,
            optionImages,
            questionImage,
        } = this.props;
        switch (renderType) {
            case CHECKBOX_GROUP:
                return (
                    <CheckBoxGroup
                        name={name}
                        choices={choices}
                        answer={answer as string[]}
                        answered={answered}
                        onChange={this.handleChange}
                        showAnswer={showAnswer}
                        optionImages={optionImages}
                        questionImage={questionImage}
                    />
                );
            case RADIO_GROUP:
                return (
                    <RadioGroup
                        name={name}
                        choices={choices}
                        optionImages={optionImages}
                        questionImage={questionImage}
                        answered={answered}
                        onChange={this.handleChange}
                        answerCheck={answerCheck}
                        showAnswer={showAnswer}
                        changeable={false}
                    />
                );
            default:
                return children;
        }
    }
    render() {
        const { question, answered, helpText } = this.props;
        return (
            <>
                {question}
                {this.renderInput()}
                {answered && helpText && <p>{helpText}</p>}
            </>
        );
    }
}

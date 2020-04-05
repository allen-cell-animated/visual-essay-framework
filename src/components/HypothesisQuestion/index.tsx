import * as React from "react";

import RadioGroup from "../uiLibrary/RadioGroup";
import CheckBoxGroup from "../uiLibrary/CheckBoxGroup";
import { CHECKBOX_GROUP, RADIO_GROUP } from "../../constants";
import { BaseQuestionProps } from "../BaseQuestion";

/**
 * A question that asks the user to state what they think is going to happen.
 * The user doesn't get immediate feedback, only after they've watched the simulation
 * and answered what happened.
 */
export default class HypothesisQuestion extends React.Component<BaseQuestionProps> {
    constructor(props: BaseQuestionProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value: string | string[]) {
        const { toggleSubmitButtonActive, onChange } = this.props;
        if (value) {
            toggleSubmitButtonActive(true);
        } else {
            toggleSubmitButtonActive(false);
        }
        onChange(value);
    }

    renderInput() {
        const { renderType, name, choices, children, answerCheck, answer, answered } = this.props;
        switch (renderType) {
            case CHECKBOX_GROUP:
                return (
                    <CheckBoxGroup
                        name={name}
                        choices={choices}
                        answer={answer as string[]}
                        answered={answered}
                        onChange={this.handleChange}
                        showAnswer={false}
                    />
                );
            case RADIO_GROUP:
                return (
                    <RadioGroup
                        name={name}
                        choices={choices}
                        answered={answered}
                        onChange={this.handleChange}
                        answerCheck={answerCheck}
                        showAnswer={false}
                        changeable={false}
                    />
                );
            default:
                return children;
        }
    }
    render() {
        const { question } = this.props;
        return (
            <>
                {question}
                {this.renderInput()}
            </>
        );
    }
}

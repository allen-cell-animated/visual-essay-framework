import * as React from "react";

import { Answer } from "../../state/quizAnswer/types";
import TextArea from "../uiLibrary/TextArea";
import { BaseQuestionProps } from "../BaseQuestion";

const styles = require("./style.css");

export interface ReflectQuestionProps extends BaseQuestionProps {
    hypothesisAnswer: Answer;
    savedAnswer: Answer;
}

/**
 * Asks the user to reflect on what they thought would happen before they watched the
 * simulation and what actually happened.
 */
export default class ReflectQuestion extends React.Component<ReflectQuestionProps> {
    constructor(props: ReflectQuestionProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value: string) {
        const { toggleSubmitButtonActive, onChange } = this.props;
        if (value) {
            toggleSubmitButtonActive(true);
        }
        onChange(value);
    }

    renderHypothesisFeedback() {
        const { hypothesisAnswer } = this.props;

        if (!hypothesisAnswer || hypothesisAnswer.correct) {
            return (
                <>
                    <label>What happened in the simulation and why?</label>
                    <TextArea rows={8} onChange={this.handleChange} />
                </>
            );
        }
        if (!hypothesisAnswer.correct && hypothesisAnswer.answerText) {
            return (
                <>
                    <label>
                        How would you explain what happened, and why did you initially think:{" "}
                        {hypothesisAnswer.answerText.toLowerCase()}?
                    </label>
                    <TextArea rows={8} onChange={this.handleChange} />
                </>
            );
        }
    }

    render() {
        const { question } = this.props;

        return (
            <div className={styles.container}>
                <p>{question}</p>
                {this.renderHypothesisFeedback()}
            </div>
        );
    }
}

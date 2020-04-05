import * as React from "react";
import { ActionCreator } from "redux";

import { Answer, ClearQuestionAction } from "../../state/quizAnswer/types";
import { RADIO_GROUP } from "../../constants";
import RadioGroup from "../uiLibrary/RadioGroup";
import { BaseQuestionProps } from "../BaseQuestion";

const styles = require("./style.css");

export interface ObserveQuestionProps extends BaseQuestionProps {
    clearAnswer: ActionCreator<ClearQuestionAction>;
    hypothesisAnswer?: Answer;
    savedAnswer?: Answer;
    onChange: (value: any) => void;
    selectedValue: string | string[];
}

/**
 * A question that asks the user to state what is happening in the simulation.
 * If they get this wrong, there is probalby something wrong with the clarity of the
 * simulation, not with their understanding.
 */
export default class ObserveQuestion extends React.Component<ObserveQuestionProps> {
    constructor(props: ObserveQuestionProps) {
        super(props);
        this.renderComponent = this.renderComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value: string | string[]) {
        const { clearAnswer, name, onChange, toggleSubmitButtonActive, selectedValue } = this.props;
        if (selectedValue) {
            // if we already had a selection, clear it from state
            clearAnswer(name);
        }
        if (selectedValue !== value) {
            // if changed selection, allow resubmit
            toggleSubmitButtonActive(true);
        }
        onChange(value);
    }

    renderComponent() {
        const {
            renderType,
            name,
            choices,
            children,
            answerCheck,
            answered,
            showAnswer,
        } = this.props;
        switch (renderType) {
            case RADIO_GROUP:
                return (
                    <RadioGroup
                        name={name}
                        choices={choices}
                        answered={answered}
                        onChange={this.handleChange}
                        answerCheck={answerCheck}
                        showAnswer={showAnswer}
                        changeable={true}
                    />
                );
        }
        return children;
    }

    renderFeedback() {
        const { savedAnswer } = this.props;
        if (savedAnswer && !savedAnswer.correct) {
            return (
                <>
                    <p>
                        !! That&apos;s not what happened, watch the simulation carefully and answer
                        again.
                    </p>
                </>
            );
        }
    }

    render() {
        const { question, hypothesisAnswer } = this.props;
        const hypothesis = hypothesisAnswer
            ? hypothesisAnswer.answerText
            : "answer previous question to compare a hypothesis to your observation";

        return (
            <div className={styles.container}>
                {question}
                <p className={styles.hypothesis}>Your hypothesis: {hypothesis}</p>
                {this.renderComponent()}
                {this.renderFeedback()}
            </div>
        );
    }
}

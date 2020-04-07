import * as React from "react";
import * as classNames from "classnames";
import { connect } from "react-redux";
import { ActionCreator } from "redux";

import HypothesisQuestion from "../../components/HypothesisQuestion";
import ObserveQuestion from "../../components/ObserveQuestion";
import BaseQuestion, { BaseQuestionProps } from "../../components/BaseQuestion";
import ReflectQuestion from "../../components/ReflectQuestion";

import { HYPOTHESIZE, OBSERVE, REFLECT } from "../../constants";
import quizAnswerStateBranch from "../../state/quizAnswer";
import { State } from "../../state";
import { getQuizAnswers } from "../../state/quizAnswer/selectors";
import { SaveQuestionAction, ClearQuestionAction } from "../../state/quizAnswer/types";
import { letterToIndex } from "../../quiz/util";

const styles = require("./style.css");

export interface QuizQuestionProps {
    allQuizAnswers: any;
    answer: string | string[];
    choices: string[];
    contentType: string;
    name: string;
    helpText?: string;
    answerCheck: (answer: any) => boolean;
    saveAnswer: ActionCreator<SaveQuestionAction>;
    hypothesisKey?: string;
    renderType: string;
    question: string;
    clearAnswer: ActionCreator<ClearQuestionAction>;
    showAnswer: boolean;
    optionImages?: string[];
    questionImage?: string;
}

interface QuizQuestionState {
    value: string | string[];
    submitButtonActive: boolean;
    numberAttempts: number;
    firstAnswer: string | string[];
}

class QuizQuestion extends React.Component<QuizQuestionProps, QuizQuestionState> {
    constructor(props: QuizQuestionProps) {
        super(props);
        this.renderComponent = this.renderComponent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleSubmitButtonActive = this.toggleSubmitButtonActive.bind(this);
        this.state = {
            value: "",
            submitButtonActive: false,
            numberAttempts: 0,
            firstAnswer: "",
        };
    }

    handleChange(value: string | string[]) {
        const attempts = this.state.numberAttempts + 1;
        const firstAnswer = this.state.numberAttempts === 0 ? value : this.state.firstAnswer;
        this.setState({ value, numberAttempts: attempts, firstAnswer });
    }

    toggleSubmitButtonActive(submitButtonActive: boolean) {
        this.setState({ submitButtonActive });
    }

    renderComponent() {
        const {
            contentType,
            name,
            choices,
            answerCheck,
            allQuizAnswers,
            answer,
            hypothesisKey,
            renderType,
            clearAnswer,
            showAnswer,
            question,
            helpText,
            optionImages,
            questionImage,
        } = this.props;

        const savedAnswer = allQuizAnswers[name];
        const hypothesisAnswer = hypothesisKey ? allQuizAnswers[hypothesisKey] : null;
        const answered = !!savedAnswer;
        const props = {
            answered,
            name,
            choices,
            onChange: this.handleChange,
            onSubmit: this.handleSubmit,
            toggleSubmitButtonActive: this.toggleSubmitButtonActive,
            savedAnswer,
            question,
            answer,
            renderType,
            answerCheck,
            showAnswer,
            selectedValue: this.state.value,
            helpText,
            optionImages,
            questionImage,
        };
        switch (contentType) {
            case HYPOTHESIZE:
                return <HypothesisQuestion {...(props as BaseQuestionProps)} />;
            case OBSERVE:
                return (
                    <ObserveQuestion
                        {...props}
                        clearAnswer={clearAnswer}
                        hypothesisAnswer={hypothesisAnswer}
                    />
                );
            case REFLECT:
                return <ReflectQuestion {...props} hypothesisAnswer={hypothesisAnswer} />;
            default:
                return <BaseQuestion {...props} showAnswer={showAnswer} />;
        }
    }

    handleSubmit() {
        const { name, answer, saveAnswer, answerCheck, choices } = this.props;
        if (!this.state.submitButtonActive) {
            return;
        }
        saveAnswer(name, {
            userSelection: this.state.value,
            correct: answerCheck(this.state.value),
            numberAttempts: this.state.numberAttempts,
            answer,
            answerText:
                typeof this.state.value === "string"
                    ? choices[letterToIndex(this.state.value)]
                    : null,
        });
        this.toggleSubmitButtonActive(false);
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderComponent()}
                <button
                    className={classNames(styles.submit, {
                        [styles.disabled]: !this.state.submitButtonActive,
                    })}
                    onClick={this.handleSubmit}
                >
                    Submit
                </button>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        allQuizAnswers: getQuizAnswers(state),
    };
}

const dispatchToPropsMap = {
    saveAnswer: quizAnswerStateBranch.actions.saveAnswer,
    clearAnswer: quizAnswerStateBranch.actions.clearAnswer,
};

export default connect(
    mapStateToProps,
    dispatchToPropsMap
)(QuizQuestion);

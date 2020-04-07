import * as React from "react";
import * as classNames from "classnames";
import { indexToLetter } from "../../../quiz/util";

const styles = require("./style.css");

export interface CheckBoxGroupProps {
    choices: string[];
    defaultValue?: string[];
    value?: string[];
    name: string;
    onChange: (value: string[]) => void;
    answered: boolean;
    showAnswer: boolean;
    answer: string[];
    questionImage?: string;
    optionImages?: string[];
}

export interface CheckBoxGroupState {
    value: string[];
}

class CheckBoxGroup extends React.Component<CheckBoxGroupProps, CheckBoxGroupState> {
    constructor(props: CheckBoxGroupProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: props.value || props.defaultValue || [],
        };
    }

    handleChange({ target }: any) {
        const { answered, onChange } = this.props;
        const { value } = target;
        const index = this.state.value.indexOf(value);
        if (answered) {
            return;
        }
        let newValue;
        if (index !== -1) {
            newValue = this.state.value.slice(index, index + 1);
        } else {
            newValue = [...this.state.value, value].sort();
        }
        this.setState({ value: newValue });
        onChange(newValue);
    }

    getClasses(value: string, checked: boolean) {
        const { answered, showAnswer, answer } = this.props;
        const isOneOfTheAnswers = answer.indexOf(value) >= 0;
        if (showAnswer) {
            return classNames(styles.checkboxButtonWrapper, {
                [styles.checked]: checked,
                [styles.correct]: answered && isOneOfTheAnswers && checked,
                [styles.incorrect]: answered && !isOneOfTheAnswers && checked,
                [styles.notAnswer]: answered && !isOneOfTheAnswers && !checked,
                [styles.rightAnswer]: answered && isOneOfTheAnswers && !checked,
            });
        }
        return classNames(styles.checkboxButtonWrapper, {
            [styles.checked]: checked,
            [styles.notAnswer]: answered && !checked,
        });
    }

    render() {
        const { choices, name, questionImage, optionImages } = this.props;
        return (
            <div
                className={classNames(styles.container, {
                    [styles.imageButtons]: optionImages && optionImages.length,
                })}
            >
                {questionImage && (
                    <div className={styles.questionImage}>
                        <img src={questionImage} />
                    </div>
                )}
                {choices.map((answer: string, index: number) => {
                    const value = indexToLetter(index);
                    const checked = this.state.value.indexOf(value) !== -1;

                    return (
                        <label key={value} className={this.getClasses(value, checked)}>
                            <input
                                type="checkbox"
                                className={styles.checkboxButton}
                                name={`${name}_${value}`}
                                value={value}
                                checked={checked}
                                onChange={this.handleChange}
                            />
                            {optionImages && optionImages.length ? (
                                <img src={optionImages[index]} />
                            ) : (
                                <span className={styles.text}>
                                    {value.toUpperCase()}) {answer}
                                </span>
                            )}
                        </label>
                    );
                })}
            </div>
        );
    }
}

export default CheckBoxGroup;

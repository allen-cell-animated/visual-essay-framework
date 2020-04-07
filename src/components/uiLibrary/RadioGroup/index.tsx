import * as React from "react";
import * as classNames from "classnames";
import { indexToLetter } from "../../../quiz/util";
const styles = require("./style.css");

export interface RadioGroupProps {
    choices: string[];
    defaultValue?: string;
    value?: string;
    name: string;
    onChange: (value: string) => void;
    answered: boolean;
    answerCheck: (value: string) => boolean;
    showAnswer: boolean;
    changeable: boolean;
    optionImages?: string[];
    questionImage?: string;
}

export interface RadioGroupState {
    value: string;
}

class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
    constructor(props: RadioGroupProps) {
        super(props);
        let value;
        if ("value" in props) {
            value = props.value;
        } else if ("defaultValue" in props) {
            value = props.defaultValue;
        }

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: value || "",
        };
    }

    handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const { answered, changeable } = this.props;
        const { value } = target;
        if (answered && !changeable) {
            return;
        }
        this.setState({ value: target.value });
        this.props.onChange(value);
    }

    getClasses(value: string, checked: boolean) {
        const { answered, answerCheck, showAnswer, changeable } = this.props;
        if (changeable) {
            return classNames(styles.radioButtonWrapper, {
                [styles.checked]: checked,
                [styles.notAnswer]: answered && !checked,
                [styles.correct]: answered && answerCheck(value) && checked,
            });
        }
        if (showAnswer) {
            return classNames(styles.radioButtonWrapper, {
                [styles.checked]: checked,
                [styles.correct]: answered && answerCheck(value) && checked,
                [styles.incorrect]: answered && !answerCheck(value) && checked,
                [styles.notAnswer]: answered && !answerCheck(value) && !checked,
                [styles.rightAnswer]: answered && answerCheck(value) && !checked,
            });
        }
        return classNames(styles.radioButtonWrapper, {
            [styles.checked]: checked,
            [styles.notAnswer]: answered && !checked,
        });
    }

    render() {
        const { choices, name, optionImages, questionImage } = this.props;
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
                    const checked = this.state.value === value;

                    return (
                        <label key={value} className={classNames(this.getClasses(value, checked))}>
                            <input
                                type="radio"
                                name={name}
                                value={value}
                                checked={checked}
                                onChange={this.handleChange}
                                className={styles.radioButton}
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

export default RadioGroup;

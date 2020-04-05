import * as React from "react";
import * as classNames from "classnames";

const styles = require("./style.css");

type ButtonHTMLTypes = "submit" | "button" | "reset";

export interface BaseButtonProps {
    htmlType?: ButtonHTMLTypes;
    classes?: string[];
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: React.PropsWithChildren<BaseButtonProps>) => {
    return (
        <button
            type={props.htmlType}
            className={classNames([styles.container, ...props.classes])}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;

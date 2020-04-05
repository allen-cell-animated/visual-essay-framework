import * as React from "react";
import * as classNames from "classnames";

const styles = require("./style.css");

export interface BasePanelProps {
    title?: string;
    content: React.ReactNode | React.ReactNodeArray;
    positioning?: string;
    background?: boolean;
    simFiles?: string[];
}

const BasePanel: React.FunctionComponent<BasePanelProps> = (props: BasePanelProps) => {
    const classes = classNames("panel", styles.panel, {
        [styles.solidBackground]: props.background,
    });

    return (
        <div className={classes}>
            <div className={classNames(styles.textContainer)}>
                {props.title && <h2>{props.title}</h2>}
                <div>{props.content}</div>
            </div>
        </div>
    );
};

export default BasePanel;

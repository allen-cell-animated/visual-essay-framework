import * as React from "react";
import * as classNames from "classnames";

import { BasePanelProps } from "../BasePanel";

const styles = require("./style.css");

export interface HalfPanelProps extends BasePanelProps {
    background?: boolean;
    imageSrc?: string;
    videoLink?: string;
}

const HalfPanel: React.FunctionComponent<HalfPanelProps> = (props: HalfPanelProps) => {
    const classes = classNames("panel", styles.panel, {
        [styles.solidBackground]: props.background,
    });

    return (
        <div className={classes}>
            <div className={classNames(styles.textContainer)}>
                <div>{props.content}</div>
            </div>
        </div>
    );
};

export default HalfPanel;

import * as React from "react";
import * as classNames from "classnames";
import { BasePanelProps } from "../BasePanel";

const styles = require("./style.css");

export interface ParallaxPanelProps extends BasePanelProps {
    backgroundImageId: string;
}

const ParallaxPanel: React.FunctionComponent<ParallaxPanelProps> = (props: ParallaxPanelProps) => {
    const classes = classNames(
        "panel",
        styles[props.backgroundImageId],
        styles.panel,
        styles.parallax,
        {
            [styles.splash]: props.positioning === "splash",
        }
    );

    return (
        <div className={classes}>
            <div className={styles.textContainer}>
                {props.title && <h2>{props.title}</h2>}
                <div>{props.content}</div>
            </div>
        </div>
    );
};

export default ParallaxPanel;

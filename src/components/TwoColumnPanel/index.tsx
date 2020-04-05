import * as React from "react";
import * as classNames from "classnames";

import { BasePanelProps } from "../BasePanel";

const styles = require("./style.css");

export interface TwoColumnPanelProps extends BasePanelProps {
    background?: boolean;
    imageSrc?: string;
    videoLink?: string;
}

const TwoColumnPanel: React.FunctionComponent<TwoColumnPanelProps> = (
    props: TwoColumnPanelProps
) => {
    const classes = classNames("panel", styles.panel, {
        [styles.solidBackground]: props.background,
    });

    return (
        <div className={classes}>
            <div className={classNames(styles.imageContainer)}>
                {props.imageSrc && <img src={props.imageSrc} />}
                {props.videoLink && (
                    <iframe
                        width="560"
                        height="315"
                        src={props.videoLink}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                )}
            </div>
            <div className={classNames(styles.textContainer)}>
                <div>{props.content}</div>
            </div>
        </div>
    );
};

export default TwoColumnPanel;

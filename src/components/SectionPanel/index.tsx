import * as React from "react";
import * as classNames from "classnames";

import { BasePanelProps } from "../BasePanel";

const styles = require("./style.css");

export interface SectionPanelProps extends BasePanelProps {
    sectionNo: number;
    backgroundImageSrc?: string;
}

const SectionPanel: React.FunctionComponent<SectionPanelProps> = (props: SectionPanelProps) => {
    const classes = classNames("panel", styles.panel);

    return (
        <div className={classes}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    <h4>Section {props.sectionNo}</h4>
                    <h2>{props.title}</h2>
                </div>
                <div className={styles.learningGoals}>{props.content}</div>
            </div>
        </div>
    );
};

export default SectionPanel;

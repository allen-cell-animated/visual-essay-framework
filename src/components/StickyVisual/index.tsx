import * as React from "react";
import * as classNames from "classnames";
import { includes, map } from "lodash";

const styles = require("./style.css");

export interface SimPanelInfo {
    panelNumber: number;
    simFiles: string[];
}
interface OverlayImages {
    imgSrc: string;
    background: boolean;
    activePanels?: number[];
}

export interface StickyVisualProps {
    currentPanel: number;
    progress: number;
    stuckPosition: number;
    svgOverlays?: OverlayImages[];
    enterOffset?: number;
    duration?: number;
    panelIndex: number; // will be added by App at render
    simPanels?: SimPanelInfo[];
    mode: string;
    background?: boolean;
}

const StickyVisual: React.FunctionComponent<React.PropsWithChildren<StickyVisualProps>> = (
    props: React.PropsWithChildren<StickyVisualProps>
) => {
    const {
        duration,
        enterOffset,
        panelIndex,
        progress,
        currentPanel,
        stuckPosition,
        svgOverlays,
        mode,
        simPanels,
        background,
    } = props;
    const enterIndex = panelIndex + (enterOffset || -1);
    const exitIndex = enterIndex + (duration || 0);

    const getTop = () => {
        if (mode === "fade") {
            return 0;
        }
        if (currentPanel === exitIndex && progress > stuckPosition) {
            return `${(-progress + 2 * stuckPosition) * 100}%`;
        }
        if (currentPanel === exitIndex + 1) {
            const intercept = 2 * stuckPosition - 1;
            const y = intercept - progress;
            return `${y * 100}%`;
        }
        if (currentPanel > exitIndex + 1) {
            return "-100%";
        }
        return `${stuckPosition * 100}%`;
    };

    const shouldFade = () => {
        // is the simulation window, should only be visible when currentPanel is included in simPanels
        if (simPanels) {
            return !includes(map(simPanels, "panelNumber"), currentPanel);
        }
        return currentPanel > exitIndex || (currentPanel === exitIndex && progress > 0.8);
    };

    return (
        <div
            style={{
                top: getTop(),
            }}
            className={classNames(styles.chart, styles.constrain, {
                [styles.background]: background,
                [styles.fade]: shouldFade(),
            })}
        >
            {React.Children.map(props.children, (child, index: number) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        key: `visual_${index}`,
                        panelIndex: props.panelIndex,
                        currentPanel: props.currentPanel,
                        progress: props.progress,
                        simPanels: props.simPanels || null,
                    });
                }
            })}
            {svgOverlays && (
                <div className={styles.imgOverlayWrap}>
                    {svgOverlays.map((ele) => (
                        <img
                            key={ele.imgSrc}
                            src={ele.imgSrc}
                            className={classNames({
                                [styles.imgBackground]: ele.background,
                                [styles.active]: includes(
                                    ele.activePanels,
                                    currentPanel - enterIndex
                                ),
                                [styles.svgOverlay]: !ele.background,
                            })}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StickyVisual;

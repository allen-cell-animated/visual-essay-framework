import * as React from "react";
import * as classNames from "classnames";
import { isUndefined } from "lodash";

import { Story } from "../../util/ScrollyTell/scrollytell";

import { sectionBreaks } from "../../essay";

const styles = require("./style.css");

interface AppState {
    currentPanel: number;
    progress: number;
    currentSection: number;
    previousPanel: number;
}

export default class App extends React.Component<{}, AppState> {
    public story: Story | undefined;
    public static getSection(currentPanel: number): number {
        for (let i = 0; i < sectionBreaks.length; i++) {
            if (currentPanel < sectionBreaks[i]) {
                return i;
            }
        }
        return 0;
    }
    constructor(props: {}) {
        super(props);
        this.state = {
            currentPanel: 0,
            progress: 0,
            currentSection: 0,
            previousPanel: 0,
        };
    }

    componentDidMount() {
        this.story = new Story({
            containerSelector: ".container",
            panelSelector: ".panel",
            chartSelector: ".chart",
            developerHud: false, // <-- disable this in production!
            enterHandler: (story, panel) => {
                // if the currently displayed element is a "chart" this callback returns -1
                // TODO: deal with backward scrolling
                const currentPanel = panel === -1 ? this.state.previousPanel + 1 : panel;
                // console.info(`Entered panel ${currentPanel}`);
                this.setState({
                    currentPanel,
                    currentSection: App.getSection(panel),
                });
            },
            exitHandler: (story, panel) => {
                this.setState({
                    previousPanel: panel,
                });
                // console.info(`Exited panel ${panel}`);
            },
            progressHandler: (story, progress) => {
                // const percentage = (100 * progress).toFixed(2);
                // console.info(`Progress is now ${percentage}%`);
                this.setState({ progress });
            },
        });
    }

    /**
     * The sim file names are props of the panel that will be on the screen when that sim file should be loaded
     * This gathers all the sim file names and the panel indices to give to the Simulation Window so it knows
     * when to be visible and what file to load.
     */
    public getSimPanelIndices() {
        const simPanels: any[] = [];
        let index = 0;
        React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                if (child.props.simFiles) {
                    simPanels.push({ panelNumber: index, simFiles: child.props.simFiles });
                }
                /**
                 * Stuck elements dont get including the the scrolly framework panel
                 * numbering, so to make sure the index actually matches the correct
                 * `currentPanel` we need to remove the stuck elements from the mapping
                 */
                if (isUndefined(child.props.stuckPosition)) {
                    index++;
                }
            }
        });
        return simPanels;
    }

    public render(): JSX.Element {
        let enterOffset = -1;
        return (
            <div className={classNames(styles.container, "container")}>
                {React.Children.map(this.props.children, (child, index: number) => {
                    if (React.isValidElement(child)) {
                        const newPanelProps = {
                            key: `panel_${index}`,
                            panelIndex: index,
                            currentPanel: this.state.currentPanel,
                            progress: this.state.progress,
                        };

                        // special panel that holds the simulation
                        // just gets faded in and out and sim trajectories get switched
                        if (child.key === "simInteractive") {
                            return React.cloneElement(child, {
                                ...newPanelProps,
                                simPanels: this.getSimPanelIndices(),
                            });
                        }
                        /**
                         * Stuck elements dont get including the the scrolly framework panel
                         * numbering, so using enterOffset to let them know where they are in
                         * relation to the panel numbering
                         */
                        if (!isUndefined(child.props.stuckPosition)) {
                            const props = { ...newPanelProps, enterOffset };
                            enterOffset = enterOffset - 1;
                            return React.cloneElement(child, props);
                        }
                        return React.cloneElement(child, newPanelProps);
                    }
                })}
            </div>
        );
    }
}

import * as React from "react";

import { map, min, max } from "lodash";
import { ActionCreator } from "redux";
import Plot from "react-plotly.js";

import { ChangeTimeAction } from "../../state/selection/types.js";

const styles = require("./style.css");

interface GraphingProps {
    graphData: any;
    time: number;
    changeTime: ActionCreator<ChangeTimeAction>;
}

interface Trace {
    name: string;
    y: number[];
}

interface ChartObject {
    type: string;
    x: number[];
    "x-label": string;
    "y-label": string;
    "y-traces": Trace[];
}

export default class Graphing extends React.Component<GraphingProps, {}> {
    public renderScatter(chart: ChartObject) {
        const { time } = this.props;
        const layout = {
            xaxis: {
                title: chart["x-label"],
                showgrid: false,
                zeroline: false,
            },
            yaxis: {
                showline: false,
                title: chart["y-label"],
            },
            margin: {
                b: 50,
                r: 50,
                t: 50,
            },
            legend: {
                orientation: "h" as "h",
                xanchor: "left" as "left",
                yanchor: "top" as "top",
                y: 1.2,
            },
            // eslint-disable-next-line
            paper_bgcolor: "rgba(255,255,255,0.0)",
            // eslint-disable-next-line
            plot_bgcolor: "rgba(255,255,255,0.0)",
            width: 400,
            height: 300,
            showlegend: true,
        };
        const max = chart["y-traces"].reduce((acc, cur) => {
            const max = Math.max(...cur.y);
            acc = Math.max(max, acc);
            return acc;
        }, 0);
        let plotDataArray = [
            {
                x: [time, time],
                y: [0, max + 10], // buffer
                mode: "lines" as "lines",
                name: "time",
            },
        ];

        const options = {
            displayModeBar: false,
            displaylogo: false,
        };

        plotDataArray = [
            ...plotDataArray,
            ...chart["y-traces"].map((ytrace, index) => {
                return {
                    x: chart.x,
                    y: ytrace.y,
                    mode: "lines" as "lines",
                    name: ytrace.name,
                };
            }),
        ];

        return (
            <Plot
                key={chart["y-label"]}
                data={plotDataArray}
                useResizeHandler={true}
                layout={layout}
                config={options}
            />
        );
    }
    public render() {
        const { graphData } = this.props;
        return (
            <div className={styles.container}>
                {map(graphData, (chart: ChartObject) => {
                    return this.renderScatter(chart);
                })}
            </div>
        );
    }
}

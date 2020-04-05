import * as React from "react";
import { ActionCreator } from "redux";
import Viewport, { AgentSimController } from "@aics/agentviz-viewer";
import { connect } from "react-redux";
import { find, isEqual } from "lodash";

import AgentVizViewer from "@aics/agentviz-viewer";

import { State } from "../../state/types";
import simDataStateBranch from "../../state/simdata";
import selectionStateBranch from "../../state/selection";
import { ChangeTimeAction, TurnAgentsOnAction } from "../../state/selection/types";
import { ReceiveAction, RequestAction } from "../../state/simdata/types";

import PlaybackControls from "../../components/PlaybackControls";
import { SimPanelInfo } from "../../components/StickyVisual";
import Graphing from "../../components/Graphing";

const styles = require("./style.css");

interface SimulationWindowProps {
    time: number;
    numberPanelsCollapsed: number;
    changeTime: ActionCreator<ChangeTimeAction>;
    timeStep: number;
    turnAgentsOn: ActionCreator<TurnAgentsOnAction>;
    receiveAgentTypeIds: ActionCreator<ReceiveAction>;
    highlightedId: string;
    totalTime: number;
    receiveSimData: ActionCreator<ReceiveAction>;
    currentPanel: number;
    simPanels: SimPanelInfo[];
    graphData: any;
    requestSimData: ActionCreator<RequestAction>;
}

interface SimulationWindowState {
    isPlaying: boolean;
    isInitialPlay: boolean;
    highlightId: number;
    particleTypeIds: string[];
    height: number;
    width: number;
    simFiles: string[];
    init: boolean;
}

const netConnectionSettings = {
    serverIp: "production-node1-agentviz-backend.cellexplore.net",
    serverPort: 9002,
};

const agentSim = new AgentSimController(netConnectionSettings);

class SimulationWindow extends React.Component<SimulationWindowProps, SimulationWindowState> {
    viewerRef: React.RefObject<Viewport>;
    private centerContent = React.createRef<HTMLDivElement>();

    constructor(props: SimulationWindowProps) {
        super(props);
        this.viewerRef = React.createRef();
        this.playBackOne = this.playBackOne.bind(this);
        this.playForwardOne = this.playForwardOne.bind(this);
        this.startPlay = this.startPlay.bind(this);
        this.pause = this.pause.bind(this);
        this.receiveTimeChange = this.receiveTimeChange.bind(this);
        this.handleJsonMeshData = this.handleJsonMeshData.bind(this);
        this.onTrajectoryFileInfoChanged = this.onTrajectoryFileInfoChanged.bind(this);
        this.skipToTime = this.skipToTime.bind(this);
        this.resize = this.resize.bind(this);
        this.state = {
            isPlaying: false,
            isInitialPlay: true,
            highlightId: -1,
            particleTypeIds: [],
            height: 0,
            width: 0,
            simFiles: ["ATPsynthase_1"],
            init: true,
        };
    }

    public resize(current: HTMLDivElement) {
        const width = current.offsetWidth;
        const height = current.offsetHeight;
        this.setState({ height, width });
    }

    public componentDidMount() {
        const current = this.centerContent.current;
        if (current) {
            window.addEventListener("resize", () => this.resize(current));
            setTimeout(() => {
                // wait for panel animation to finish.
                this.resize(current);
            }, 200);
        }
    }

    public componentDidUpdate(prevProps: SimulationWindowProps) {
        const { currentPanel, simPanels, requestSimData, changeTime } = this.props;
        if (currentPanel != prevProps.currentPanel) {
            const currentSimPanel = find(simPanels, { panelNumber: currentPanel });
            if (currentSimPanel) {
                const { simFiles } = currentSimPanel;
                if (this.state.init) {
                    // first scene loaded, start playing
                    this.startPlay();
                    this.setState({ init: false });
                }
                if (!isEqual(simFiles, this.state.simFiles)) {
                    this.setState({ simFiles });
                    agentSim.changeFile(`${simFiles[0]}.h5`);
                    requestSimData(simFiles[0]);
                    changeTime(0);

                    if (this.viewerRef.current) {
                        // when there is a new scene, reset the camera to a useful view
                        this.viewerRef.current.resetCamera();
                    }
                }
            }
        }
    }

    public playForwardOne() {
        const { time, timeStep } = this.props;
        agentSim.playFromTime(time + timeStep);
    }

    public playBackOne() {
        const { time, timeStep } = this.props;
        if (time - timeStep >= 0) {
            agentSim.playFromTime(time - timeStep);
        }
    }

    public handleJsonMeshData(jsonData: any) {
        const { receiveAgentTypeIds, turnAgentsOn } = this.props;
        const particleTypeIds = Object.keys(jsonData);
        turnAgentsOn(particleTypeIds);
        receiveAgentTypeIds(particleTypeIds);
    }

    public highlightParticleType(typeId: number) {
        const highlightId = typeId;
        this.setState({ highlightId });
    }

    public startPlay() {
        const { time, timeStep } = this.props;
        if (this.state.isPlaying) {
            return;
        }
        agentSim.playFromTime(time + timeStep);
        this.setState({ isPlaying: true });
    }

    public pause() {
        agentSim.pause();
        this.setState({ isPlaying: false });
    }

    public onTrajectoryFileInfoChanged(data: any) {
        const { receiveSimData, time } = this.props;
        receiveSimData({
            totalTime: data.totalDuration,
            timeStepSize: data.timeStepSize,
        });
        if (this.state.isPlaying) {
            agentSim.playFromTime(time + data.timeStepSize);
        }
    }

    public receiveTimeChange(timeData: any) {
        const { changeTime, timeStep } = this.props;
        changeTime(timeData.time);
    }

    public skipToTime(time: number) {
        agentSim.pause();
        agentSim.playFromTime(time);
    }

    public render(): JSX.Element {
        const { time, changeTime, totalTime, highlightedId, graphData } = this.props;
        return (
            <div ref={this.centerContent} className={styles.container}>
                <AgentVizViewer
                    ref={this.viewerRef}
                    height={this.state.height}
                    width={this.state.width}
                    devgui={false}
                    loggerLevel="off"
                    onTimeChange={this.receiveTimeChange}
                    agentSimController={agentSim}
                    onJsonDataArrived={this.handleJsonMeshData}
                    highlightedParticleType={highlightedId}
                    onTrajectoryFileInfoChanged={this.onTrajectoryFileInfoChanged}
                />
                <Graphing time={time} key="graph" changeTime={changeTime} graphData={graphData} />
                <PlaybackControls
                    playHandler={this.startPlay}
                    time={time}
                    onTimeChange={this.skipToTime}
                    pauseHandler={this.pause}
                    prevHandler={this.playBackOne}
                    nextHandler={this.playForwardOne}
                    isPlaying={this.state.isPlaying}
                    totalTime={totalTime}
                />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        time: selectionStateBranch.selectors.getCurrentTime(state),
        numberPanelsCollapsed: selectionStateBranch.selectors.getNumberCollapsed(state),
        totalTime: simDataStateBranch.selectors.getTotalTimeOfCachedSimulation(state),
        timeStep: simDataStateBranch.selectors.getTimeStepSize(state),
        highlightedId: selectionStateBranch.selectors.getHightlightedId(state),
        graphData: simDataStateBranch.selectors.getGraphData(state),
    };
}

const dispatchToPropsMap = {
    changeTime: selectionStateBranch.actions.changeTime,
    receiveSimData: simDataStateBranch.actions.receiveSimData,
    receiveAgentTypeIds: simDataStateBranch.actions.receiveAgentTypeIds,
    turnAgentsOn: selectionStateBranch.actions.turnAgentsOn,
    requestSimData: simDataStateBranch.actions.requestSimData,
};

export default connect(
    mapStateToProps,
    dispatchToPropsMap
)(SimulationWindow);

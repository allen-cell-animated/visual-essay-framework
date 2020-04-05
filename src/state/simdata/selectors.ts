import { createSelector } from "reselect";

import { State } from "../types";

import { SimDataStateBranch } from "./types";

// BASIC SELECTORS
export const getMetadata = (state: State) => state.simdata;
export const getGraphData = (state: State) => state.simdata.graphData;
export const getTotalTimeOfCachedSimulation = (state: State) => state.simdata.totalTime;
export const getTimeStepSize = (state: State) => state.simdata.timeStepSize;
export const getAgentIds = (state: State) => state.simdata.agentIds;
// COMPOSED SELECTORS
export const getKeysOfMetadata = createSelector(
    [getMetadata],
    (simdata: SimDataStateBranch): string[] => Object.keys(simdata)
);

import { AnyAction } from "redux";

import { TypeToDescriptionMap } from "../types";
import { makeReducer } from "../util";

import { RECEIVE_METADATA, RECEIVE_AGENT_IDS } from "./constants";
import { ReceiveAction, SimDataStateBranch } from "./types";

export const initialState = {
    totalTime: 0,
    timeStep: 0,
    agentIds: [],
};

const actionToConfigMap: TypeToDescriptionMap = {
    [RECEIVE_METADATA]: {
        accepts: (action: AnyAction): action is ReceiveAction => action.type === RECEIVE_METADATA,
        perform: (state: SimDataStateBranch, action: ReceiveAction) => ({
            ...state,
            ...action.payload,
        }),
    },
    [RECEIVE_AGENT_IDS]: {
        accepts: (action: AnyAction): action is ReceiveAction => action.type === RECEIVE_AGENT_IDS,
        perform: (state: SimDataStateBranch, action: ReceiveAction) => ({
            ...state,
            agentIds: action.payload,
        }),
    },
};

export default makeReducer<SimDataStateBranch>(actionToConfigMap, initialState);

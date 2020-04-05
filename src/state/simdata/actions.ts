import { RECEIVE_METADATA, REQUEST_METADATA, RECEIVE_AGENT_IDS } from "./constants";
import { SimDataStateBranch, ReceiveAction, RequestAction } from "./types";

export function receiveSimData(payload: SimDataStateBranch): ReceiveAction {
    return {
        payload,
        type: RECEIVE_METADATA,
    };
}

export function requestSimData(payload: string): RequestAction {
    return {
        payload,
        type: REQUEST_METADATA,
    };
}

export function receiveAgentTypeIds(payload: SimDataStateBranch): ReceiveAction {
    return {
        payload,
        type: RECEIVE_AGENT_IDS,
    };
}

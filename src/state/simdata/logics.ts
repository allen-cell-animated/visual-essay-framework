import { AxiosResponse } from "axios";
import { createLogic } from "redux-logic";

import { ReduxLogicDeps } from "../types";

import { receiveSimData } from "./actions";
import { REQUEST_METADATA } from "./constants";
import { ReceiveAction } from "./types";

const requestSimTrajectory = createLogic({
    process(deps: ReduxLogicDeps, dispatch: (action: ReceiveAction) => void, done: () => void) {
        const { baseApiUrl, httpClient, action } = deps;
        httpClient
            .get(`${baseApiUrl}/${action.payload}_plot.json`)
            .then((metadata: AxiosResponse) => {
                dispatch(receiveSimData({ graphData: metadata.data }));
            })
            .catch((reason) => {
                // not all trajectories have plot data.
                // console.log(reason);
            })
            .then(done);
    },
    type: REQUEST_METADATA,
});

export default [requestSimTrajectory];

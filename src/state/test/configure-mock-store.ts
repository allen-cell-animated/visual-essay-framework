import { AxiosInstance } from "axios";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogicMiddleware } from "redux-logic";
import { SinonStub } from "sinon";

import { enableBatching, initialState, quizAnswer, selection, simdata, State } from "../";

export interface ReduxLogicDependencies {
    baseApiUrl: string;
    httpClient: AxiosInstance & {
        get: SinonStub;
    };
}

const reducers = {
    simdata: simdata.reducer,
    quizAnswer: quizAnswer.reducer,
    selection: selection.reducer,
};

const logics = [...quizAnswer.logics, ...selection.logics, ...simdata.logics];

export function createReduxStore(
    preloadedState: State,
    reduxLogicDependencies: ReduxLogicDependencies
) {
    const logicMiddleware = createLogicMiddleware(logics);
    logicMiddleware.addDeps(reduxLogicDependencies);

    const middleware = applyMiddleware(logicMiddleware);
    const rootReducer = enableBatching<State>(combineReducers(reducers), initialState);

    if (preloadedState) {
        return createStore(rootReducer, preloadedState, middleware);
    }
    return createStore(rootReducer, middleware);
}

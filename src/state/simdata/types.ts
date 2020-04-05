export interface SimDataStateBranch {
    [key: string]: any;
}

export interface ReceiveAction {
    payload: SimDataStateBranch;
    type: string;
}

export interface RequestAction {
    payload: string;
    type: string;
}

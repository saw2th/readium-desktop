import { Action } from "redux";

export const SET_LAYOUT =  "SET_LAYOUT";

export interface ILayoutAction extends Action {
    layout: string;
}


export function setLayout(layout: boolean): ILayoutAction {
    return {
        type: SET_LAYOUT,
        layout: layout ? 'grid':'list',
    };
}

import { ILayoutAction, SET_LAYOUT } from "./../actions/layout";


const initialState: string = 'grid';


export function layout(
    state: string = initialState,
    action: ILayoutAction,
    ): string {
    switch (action.type) {
        case SET_LAYOUT:
            state = action.layout;
            return state;
        default:
            return state;
    }
}

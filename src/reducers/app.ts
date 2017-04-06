import { combineReducers } from "redux";
import { i18n, I18NState } from "./i18n";
import { layout } from "./layout";

export interface IAppState {
    i18n: I18NState;
    layout: string;
}

export const app = combineReducers({
    i18n,
    layout
});

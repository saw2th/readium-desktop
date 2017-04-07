import * as React from "react";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import { lightBaseTheme, MuiThemeProvider } from "material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import { Store } from "redux";

import { setLocale } from "../actions/i18n";
import { lazyInject } from "../di";
import { Translator } from "../i18n/translator";
import { IAppState } from "../reducers/app";

import Library from "./Library";

const lightMuiTheme = getMuiTheme(lightBaseTheme);
const defaultLocale = "en";

export default class App extends React.Component<undefined, undefined> {
    @lazyInject("store")
    private store: Store<IAppState>;

    @lazyInject(Translator)
    private translator: Translator;

    constructor() {
        super();
        let locale = this.store.getState().i18n.locale;

        if (locale == null) {
            this.store.dispatch(setLocale(defaultLocale));
        }

        this.translator.setLocale(locale);
    }

    public componentDidMount() {
        this.store.subscribe(() => {
            this.translator.setLocale(this.store.getState().i18n.locale);
        });
    }

    public render(): React.ReactElement<{}> {
        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <Library />
            </MuiThemeProvider>              
        );
    }
}

import { MinLength, validate } from "class-validator";
import * as React from "react";
import { Store } from "redux";

import { Card, CardHeader, CardMedia } from "material-ui/Card";
import DropDownMenu from "material-ui/DropDownMenu";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import { blue500 } from "material-ui/styles/colors";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import TextField from "material-ui/TextField";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import Checkbox from "material-ui/Checkbox";

import { setLocale } from "../actions/i18n";
import { setLayout } from "../actions/layout";
import { lazyInject } from "../di";
import { Translator } from "../i18n/translator";
import { IAppState } from "../reducers/app";

import Booklist from "./Booklist";


// DANIEL - IPC test
import { ipcRenderer } from "electron";

interface ILibraryState {
    locale: string;
    layout: string;
}

export default class Library extends React.Component<undefined, ILibraryState> {
    public state: ILibraryState;

    // DANIEL - IPC test
    public _handleClick() {
        console.log("CLICK");

        // let response = ipcRenderer.sendSync('synchronous-message', 'RENDERER SYNC');
        // console.log(response);

        ipcRenderer.on('asynchronous-reply', (event, arg) => {
            console.log(arg);
        })
        ipcRenderer.send('asynchronous-message', 'RENDERER ASYNC')
    }

    @lazyInject(Translator)
    private translator: Translator;

    @lazyInject("store")
    private store: Store<IAppState>;

    constructor() {
        super();
        this.state = {
            locale: this.store.getState().i18n.locale,
            layout: this.store.getState().layout
        };

        this.handleLocaleChange = this.handleLocaleChange.bind(this);
        this.handleLayoutChange = this.handleLayoutChange.bind(this);
    }

    public componentDidMount() {
        this.store.subscribe(() => {
            this.setState({
                locale: this.store.getState().i18n.locale,
                layout: this.store.getState().layout,
            });
        });
    }

    public render(): React.ReactElement<{}>  {
        const __ = this.translator.translate;

        return (
            <div>
                <Toolbar className={'jason-class'}>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.locale} onChange={this.handleLocaleChange}>
                            <MenuItem value="en" primaryText="English" />
                            <MenuItem value="fr" primaryText="French" />
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="Options" />
                        <FontIcon className="muidocs-icon-custom-sort" />
                        <ToolbarSeparator />
                        <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <FontIcon
                                    className="fa fa-home"
                                    color={blue500} />
                            </IconButton>
                        }
                        >
                            <MenuItem primaryText="Download" />
                            <MenuItem primaryText="More Info" />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                <h1>{__("library.heading")}</h1>

                <RaisedButton label="DANIEL - IPC test" onClick={this._handleClick} />
                <Checkbox label={this.state.layout == 'grid' ? 'Grid': 'List'} checked={this.state.layout == 'grid'} onCheck={this.handleLayoutChange} />
                <Booklist />
            </div>
        );
    }

    private handleLocaleChange(event: any, index: any, locale: string) {
        this.store.dispatch(setLocale(locale));
    }
    private handleLayoutChange(event: any, state: boolean) {
        this.store.dispatch(setLayout(state));
    }

}

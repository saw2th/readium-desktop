import * as React from "react";
import { Store } from "redux";
import { lazyInject } from "../di";
import { IAppState } from "../reducers/app";

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

interface IBooklistState {
    layout: string;
}

const tilesData = [
  {
    title: 'Breakfast',
      author: 'jill111',
      img: 'http://www.material-ui.com/images/grid-list/honey-823614_640.jpg',
  },
  {
    title: 'Tasty burger',
   author: 'pashminu',
      img: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',

  },
  {
    title: 'Camera',
      author: 'Danson67',
      img: 'http://www.material-ui.com/images/grid-list/camera-813814_640.jpg',

  },
];

const list_styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
      height: 450,
  },
};

export default class Booklist extends React.Component<undefined, IBooklistState> {
    public state: IBooklistState;

    @lazyInject("store")
    private store: Store<IAppState>;

    constructor() {
        super();
        this.state = {
            layout: this.store.getState().layout
        };
    }

    public componentDidMount() {
        this.store.subscribe(() => {
            this.setState({
                layout: this.store.getState().layout,
            });
        });
    }
    
    public render(): React.ReactElement<{}>  {
    
        return (
                <div >
                <GridList
            cellHeight={180}
            cols={this.state.layout == 'list' ? 1 : 2}
            style={list_styles.gridList}
                >
                <Subheader>December</Subheader>
                {tilesData.map((tile) => (
                        <GridTile
                    key={tile.img}
                    title={tile.title}
                    subtitle={<span>by <b>{tile.author}</b></span>}
                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                                >
                                <img src={tile.img} />
                                </GridTile>
                               ))}
                 </GridList>
                 </div>
                    );
        }
}



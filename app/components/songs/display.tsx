import * as React from "react"
import RaisedButton from "material-ui/RaisedButton"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import Avatar from "material-ui/Avatar"
import { List as UIList, ListItem } from "material-ui/List"
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble"
import { AJAX } from "../../../shared/ajax"
import Subheader from "material-ui/Subheader"
import FlatButton from "material-ui/FlatButton"
import { LOADING } from "../loading"
import * as ReactList from "react-list"
import * as CSS from "./song.css"
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer"
import List from "react-virtualized/dist/commonjs/List"
import { compose } from "recompose"
import { connect } from "react-redux"
import { filterSearchSongs, filterSongsByType, filterExplicitSongs, FilterNavigation } from "./filters"
import { SongsList } from "./list";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


@compose(
    connect((state) => {
        return ({ songs: { ...state.songs, data: filterSearchSongs(state) } })
    })
)
export class SongsDisplay extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    public render() {
        return this.props.songs.loading ?
            <LOADING userAgent={this.props.userAgent} /> :
            (
                <div className={CSS.container}>
                    <FloatingActionButton
                        className={CSS.float}
                        onClick={() => { this.props.DISPATCH("SET_SONG_VISIBILITY_FILTER", !this.props.songs.visibility) }}
                    >
                        <DashboardIcon />
                    </FloatingActionButton>
                    <SongsList {...this.props} />
                    <FilterNavigation  {...this.props} />
                </div>
            )
    }
}


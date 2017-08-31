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
import { filterSongsByType, filterExplicitSongs, FilterNavigation } from "./filters"
import { SongsList } from "./list";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class SongsDisplayClass extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.getMySongs = this.getMySongs.bind(this)
    }

    public componentWillMount() {
        console.log(this.props.songs)
        if (this.props.songs.data.length === 0) {
            this.getMySongs()
        }
    }

    public render() {
        return this.props.songs.loading ?
            <LOADING userAgent={this.props.userAgent} /> :
            (
                <div className={CSS.container}>
                    <FloatingActionButton
                        className={CSS.float}
                        onClick={() => {
                            this.props.SET_SONG_VISIBILITY_FILTER_ACTION(
                                !this.props.songs.visibility
                            )
                        }}
                    >
                        <DashboardIcon />
                    </FloatingActionButton>
                    <FilterNavigation  {...this.props} />
                    <SongsList {...this.props} />
                </div>
            )
    }

    private getMySongs() {
        AJAX("/songs", this.props.token)
            .map((user) => {
                this.props.dispatch({ type: "SET_SONGS", payload: user.response })
                this.props.SET_SONG_LOADING_FILTER_ACTION(false)
            }).take(1).subscribe()
    }
}

export const SongsDisplay = compose(
    connect((state) => {
        return ({ songs: { ...state.songs, data: filterExplicitSongs(state) } })
    })
)(SongsDisplayClass)

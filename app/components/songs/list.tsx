import * as React from "react"
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

export class SongsList extends React.Component<any, any> {
    constructor(props) {
        super(props)
        console.log(props)
        this.getMySongs = this.getMySongs.bind(this)
        this.list = this.list.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
    }
    public componentWillMount() {
        if (this.props.songs.length === 0) {
            this.getMySongs()
        }
    }
    public render() {
        return this.props.songs.length !== 0 ?
            (
                <div className={CSS.container}>
                    <Subheader>Songs</Subheader>
                    {this.list()}
                </div>
            ) : <LOADING userAgent={this.props.userAgent} />
    }
    private list() {
        return (
            <div className={CSS.listWrapper}>
                <AutoSizer>
                    {({ height, width }) =>
                        (
                            <List
                                width={width}
                                height={height}
                                rowCount={this.props.songs.length}
                                rowHeight={56}
                                rowRenderer={this.rowRenderer}
                            />
                        )
                    }
                </AutoSizer>
            </div>
        )
    }
    private rowRenderer({ key, index, isScrolling, isVisible, style }) {
        const { track } = this.props.songs[index]
        return (
            <ListItem
                key={key}
                style={style}
                leftAvatar={<Avatar src={this.makeSure(track.album)} />}
                primaryText={track.name}
                onClick={() => {
                    this.props.ROUTER_ACTION(
                        "DASHBOARD_DETAIL",
                        {
                            token: this.props.location.payload.token,
                            state: this.props.location.payload.state,
                            tab: "songs",
                            id: track.id,
                            data: track,
                            user: this.props.location.payload.user
                        }
                    )
                }}
                rightIcon={<CommunicationChatBubble />}
            />
        )
    }

    private makeSure(follower) {
        return follower.images[0] ? follower.images[0].url :
            "https://google.com/favicon.ico"
    }
    private getMySongs() {
        AJAX("/songs", this.props.token)
            .map((user) => {
                this.setState({ loading: false })
                this.props.dispatch({ type: "SET_SONGS", payload: user.response })
            }).take(1).subscribe()
    }
}

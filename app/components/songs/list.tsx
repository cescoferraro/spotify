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
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader"
import { compose } from "recompose"
import { connect } from "react-redux"
import { filterSongsByType, filterExplicitSongs, FilterNavigation } from "./filters"
import * as cs from "classnames"

export class SongsList extends React.Component<any, any> {
    constructor(props) {
        super(props)
        console.log(props)
        this.rowRenderer = this.rowRenderer.bind(this)
    }

    public render() {
        return (
            <div className={
                cs(CSS.listWrapper,
                    this.props.songs.visibility ? CSS.listLow : CSS.listFull)}>
                <AutoSizer>
                    {({ height, width }) => {
                        if (this.props.songs.data.length !== 0) {
                            return (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={this.props.songs.data.length}
                                    rowHeight={56}
                                    rowRenderer={this.rowRenderer}
                                />
                            )
                        } else {
                            return (
                                <ListItem
                                    leftAvatar={<Avatar />}
                                    primaryText={"no songs"}
                                    rightIcon={<CommunicationChatBubble />}
                                />)
                        }
                    }}
                </AutoSizer>
            </div>
        )
    }
    private rowRenderer({ key, index, isScrolling, isVisible, style }) {
        const { track } = this.props.songs.data[index]
        return (
            <ListItem
                key={key}
                style={style}
                leftAvatar={<Avatar src={this.makeSure(track.album)} />}
                rightIcon={<CommunicationChatBubble />}
                primaryText={track.name}
                onClick={() => {
                    this.props.ROUTER_ACTION(
                        "DASHBOARD_DETAIL",
                        {
                            tab: "songs",
                            id: track.id,
                            data: track
                        }
                    )
                }}
            />
        )
    }

    private makeSure(follower) {
        return follower.images[0] ? follower.images[0].url :
            "https://google.com/favicon.ico"
    }
}


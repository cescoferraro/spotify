import * as React from "react"
import Avatar from "material-ui/Avatar"
import { List as UIList, ListItem } from "material-ui/List"
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble"
import { AJAX } from "../../../shared/ajax"
import Subheader from "material-ui/Subheader"
import FlatButton from "material-ui/FlatButton"
import { LOADING } from "../loading"
import * as ReactList from "react-list"
import * as CSS from "./playlists.css"
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer"
import List from "react-virtualized/dist/commonjs/List"
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader"
import { compose } from "recompose"
import { connect } from "react-redux"
import * as cs from "classnames"

export class PlaylistsList extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.rowRenderer = this.rowRenderer.bind(this)
    }

    public render() {
        return (
            <div className={
                cs(CSS.listWrapper,
                    this.props.playlists.visibility ? CSS.listLow : CSS.listFull)}>
                <AutoSizer>
                    {({ height, width }) => {
                        if (this.props.playlists.data.length !== 0) {
                            return (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={this.props.playlists.data.length}
                                    rowHeight={56}
                                    rowRenderer={this.rowRenderer}
                                />
                            )
                        } else {
                            return (
                                <ListItem
                                    leftAvatar={<Avatar />}
                                    primaryText={"no playlists"}
                                    rightIcon={<CommunicationChatBubble />}
                                />)
                        }
                    }}
                </AutoSizer>
            </div>
        )
    }
    private rowRenderer({ key, index, isScrolling, isVisible, style }) {
        const track = this.props.playlists.data[index]
        return (
            <ListItem
                key={key}
                style={style}
                primaryText={track.name}
                leftAvatar={<Avatar src={this.makeSure(track)} />}
                rightIcon={<CommunicationChatBubble />}
                onClick={() => {
                    this.props.DISPATCH("SET_PLAYLISTS_DETAIL", track)
                    this.props.ROUTER_ACTION("DASHBOARD_DETAIL", { tab: "playlists", id: track.id, data: track })
                }}
            />
        )
    }
    private makeSure(follower) {
        return follower.images[0] ? follower.images[0].url :
            "https://google.com/favicon.ico"
    }
}


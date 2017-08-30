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
import { compose } from "recompose"
import { connect } from "react-redux"
import { filterSongsByType, filterExplicitSongs, FilterNavigation } from "./filters"

export class SongsList extends React.Component<any, any> {
    constructor(props) {
        super(props)
        console.log(props)
        this.rowRenderer = this.rowRenderer.bind(this)
    }

    public render() {
        return this.props.songs.length !== 0 ?
            (<div className={CSS.listWrapper}>
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
            ) : (
                <ListItem
                    leftAvatar={<Avatar />}
                    primaryText={"no songs"}
                    rightIcon={<CommunicationChatBubble />}
                />)
    }
    private rowRenderer({ key, index, isScrolling, isVisible, style }) {
        const { payload } = this.props.location
        const { track } = this.props.songs[index]
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
                            ...payload,
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


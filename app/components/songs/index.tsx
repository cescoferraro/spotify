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
import sizeMe from "react-sizeme"


@sizeMe()
export class Songs extends React.Component<any, any> {
    constructor(props) {
        super(props)
        console.log(props)
        this.getMySongs = this.getMySongs.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
        this.state = {
            loading: false,
            songs: []
        }
    }
    public componentWillMount() { this.getMySongs() }
    public render() {
        return this.state.songs.length !== 0 ?
            <div className={CSS.container}>
                <AutoSizer>
                    {({ height, width }) => {
                        console.log(width, height)
                        return (
                            <List
                                width={width}
                                height={height}
                                rowCount={this.state.songs.length}
                                rowHeight={56}
                                rowRenderer={this.rowRenderer}
                            />
                        )
                    }}
                </AutoSizer>
            </div>
            :
            <LOADING userAgent={this.props.userAgent} />
    }

    private rowRenderer({ key, index, isScrolling, isVisible, style }) {
        const { track } = this.state.songs[index]
        console.log(track)
        return (
            <ListItem
                key={key}
                style={style}
                leftAvatar={<Avatar src={this.makeSure(track.album)} />}
                primaryText={track.name}
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
                console.log(user)
                console.log(user.response.length)
                this.setState({ songs: user.response, loading: false })
            }).take(1).subscribe()
    }
}

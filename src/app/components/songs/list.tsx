import * as cs from "classnames"
import Avatar from "material-ui/Avatar"
import {ListItem} from "material-ui/List"
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble"
import * as React from "react"
import {AutoSizer, List} from "react-virtualized"
import * as CSS from "./song.css"

export class SongsList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(props);
        this.rowRenderer = this.rowRenderer.bind(this)
    }

    public render() {
        return (
            <div className={
                cs.default(CSS.listWrapper,
                    this.props.songs.visibility ? CSS.listLow : CSS.listFull)}

                 style={{height: 400}}
            >
                <AutoSizer>
                    {({height, width}: any) => {
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
                                    leftAvatar={<Avatar/>}
                                    primaryText={"no songs"}
                                    rightIcon={<CommunicationChatBubble/>}
                                />)
                        }
                    }}
                </AutoSizer>
            </div>
        )
    }

    private rowRenderer({key, index, isScrolling, isVisible, style}: any) {
        const {track} = this.props.songs.data[index];
        return (
            <ListItem
                key={key}
                style={style}
                leftAvatar={<Avatar src={this.makeSure(track.album)}/>}
                rightIcon={<CommunicationChatBubble/>}
                primaryText={track.name}
                onClick={() => {
                    this.props.DISPATCH("SET_SONGS_DETAIL", track);
                    this.props.DISPATCH("DASHBOARD_DETAIL", {tab: "songs", id: track.id, data: track})
                }}
            />
        )
    }

    private makeSure(follower: any) {
        return follower.images[0] ? follower.images[0].url :
            "https://google.com/favicon.ico"
    }
}


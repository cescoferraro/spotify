import * as React from "react"
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer"
import List from "react-virtualized/dist/commonjs/List"
import Avatar from "material-ui/Avatar"
import { UIList, ListItem } from "material-ui/List"
import * as CSS from "./following.css"
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble"
import { AJAX } from "../../../shared/ajax"
import Subheader from "material-ui/Subheader"
import FlatButton from "material-ui/FlatButton"
import { LOADING } from "../loading/index";

export class Following extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.unfollowArtist = this.unfollowArtist.bind(this)
        this.getFollowingArtists = this.getFollowingArtists.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
        this.state = { followers: [] }
    }
    public componentWillMount() { this.getFollowingArtists() }
    public render() {
        return this.state.followers.length !== 0 ?
            <div className={CSS.container}>
                <AutoSizer>
                    {({ height, width }) => {
                        console.log(width, height)
                        return (
                            <List
                                width={width}
                                height={height}
                                rowCount={this.state.followers.length}
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
        const artist = this.state.followers[index]
        const goUnfollow = () => { this.unfollowArtist(artist.id) }
        return (
            <ListItem
                key={key}
                style={style}
                leftAvatar={<Avatar src={this.makeSure(artist)} />}
                primaryText={artist.name}
                rightIcon={<FlatButton onClick={goUnfollow} label="UNFOLLOW" primary={true} />}
            />)
    }
    private makeSure(artist) {
        return artist.images[0] ? artist.images[0].url :
            "https://google.com/favicon.ico"
    }
    private unfollowArtist(id) {
        AJAX("/unfollow/" + id, this.props.token)
            .map((user) => {
                const followers = this.state
                    .followers.filter((artist) => (artist.id !== id))
                this.setState({ followers })
            }).take(1).subscribe()
    }
    private getFollowingArtists() {
        AJAX("/following", this.props.token)
            .map((user) => {
                this.setState({ followers: user.response.items })
            }).take(1).subscribe()
    }
}

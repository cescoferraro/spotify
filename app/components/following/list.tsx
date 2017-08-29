import * as React from "react";
import CommunicationChatBubble from "material-ui/svg-icons/content/remove"
import Subheader from "material-ui/Subheader"
import * as CSS from "./following.css"
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer"
import List from "react-virtualized/dist/commonjs/List"
import { LOADING } from "../loading/index";
import { AJAX } from "../../../shared/ajax";
import { ListItem } from "material-ui/List"
import Avatar from "material-ui/Avatar"



export class ArtistList extends React.Component<any, any>{
    constructor(props) {
        super(props)
        this.unfollowArtist = this.unfollowArtist.bind(this)
        this.getFollowingArtists = this.getFollowingArtists.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
        this.state = { followers: [] }
    }
    public componentWillMount() { this.getFollowingArtists() }
    public render() {
        return this.state.followers.length !== 0 ? (
            <div className={CSS.container}>
                <Subheader>Following</Subheader>
                <div className={CSS.listWrapper}>
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
            </div>
        ) : <LOADING userAgent={this.props.userAgent} />
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
                onClick={() => {
                    this.props.ROUTER_ACTION(
                        "DASHBOARD_DETAIL",
                        {
                            token: this.props.location.payload.token,
                            state: this.props.location.payload.state,
                            tab: "following",
                            id: artist.id,
                            data: artist,
                            user: this.props.location.payload.user
                        }
                    )
                }}
                rightIcon={<CommunicationChatBubble onClick={goUnfollow} />}
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

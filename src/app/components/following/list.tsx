import Avatar from "material-ui/Avatar"
import {ListItem} from "material-ui/List"
import Subheader from "material-ui/Subheader"
import CommunicationChatBubble from "material-ui/svg-icons/content/remove"
import * as React from "react";
import {AutoSizer, List} from "react-virtualized"
import {AJAX} from "../../../shared/ajax";
import {LOADING} from "../loading/index";
import * as CSS from "./following.css"

export class ArtistList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.unfollowArtist = this.unfollowArtist.bind(this);
        this.getFollowingArtists = this.getFollowingArtists.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
        this.state = {followers: []}
    }

    public componentWillMount() {
        this.getFollowingArtists()
    }

    public render() {
        return this.state.followers.length !== 0 ? (
            <div className={CSS.container}>
                <Subheader>Following</Subheader>
                <div
                    style={{height: 400}}
                    className={CSS.listWrapper}>
                    <AutoSizer>
                        {({height, width}: any) => {
                            console.log(width, height);
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
        ) : <LOADING userAgent={this.props.userAgent}/>
    }

    private rowRenderer({key, index, isScrolling, isVisible, style}: any) {
        const artist = this.state.followers[index];
        const goUnfollow = () => {
            this.unfollowArtist(artist.id)
        };
        return (
            <ListItem
                key={key}
                style={style}
                leftAvatar={<Avatar src={this.makeSure(artist)}/>}
                primaryText={artist.name}
                onClick={() => {
                    this.props.ROUTER_ACTION(
                        "DASHBOARD_DETAIL",
                        {
                            token: this.props.token,
                            tab: "following",
                            id: artist.id,
                            data: artist,
                            user: this.props.user
                        }
                    )
                }}
                rightIcon={<CommunicationChatBubble onClick={goUnfollow}/>}
            />)
    }

    private makeSure(artist: any) {
        return artist.images[0] ? artist.images[0].url :
            "https://google.com/favicon.ico"
    }

    private unfollowArtist(id: any) {
        AJAX("/unfollow/" + id, this.props.token)
            .map((user) => {
                const followers = this.state
                    .followers.filter((artist: any) => (artist.id !== id));
                this.setState({followers})
            }).take(1).subscribe()
    }

    private getFollowingArtists() {
        AJAX("/following", this.props.token)
            .map((user) => {
                this.setState({followers: user.response.items})
            }).take(1).subscribe()
    }

}

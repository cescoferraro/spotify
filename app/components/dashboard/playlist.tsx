import * as React from "react"
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import RaisedButton from "material-ui/RaisedButton"
import { API_URL } from "../../../shared/api/index"
import * as CSS from "./main.css"
import Avatar from "material-ui/Avatar"
import { List, ListItem } from "material-ui/List"
import Subheader from "material-ui/Subheader"
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble"
import { compose } from "recompose"
import { connect } from "react-redux"
import { bodyUrl } from "../../../shared/ajax"

class MyPlaylistsClass extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            hidden: true,
            playlists: []
        }
        this.play = this.play.bind(this)
        this.getTOP5 = this.getTOP5.bind(this)
        this.playSong = this.playSong.bind(this)
    }
    public render() {
        const label = this.state.hidden ? "Show" : "Hide"
        return <div className={CSS.feature} >
            <RaisedButton
                fullWidth={true}
                label={label + " Playlists"}
                secondary={true}
                className={CSS.selectButton}
                onClick={() => {
                    console.log(this.state.hidden)
                    this.getTOP5()
                    this.setState({ hidden: !this.state.hidden })
                }}
            />
            {this.state.hidden ? null : (
                <List>
                    <Subheader>Recent chats</Subheader>
                    {this.state.playlists.map((follower) => {
                        console.log(follower)
                        return (
                            <ListItem
                                leftAvatar={
                                    <Avatar
                                        src={follower.images[0] ?
                                            follower.images[0].url :
                                            "https://google.com/favicon.ico"
                                        }
                                    />}
                                key={Math.random()}
                                primaryText={follower.name}
                                rightIcon={
                                    <CommunicationChatBubble
                                        onClick={this.playSong(follower)}
                                    />}
                            />
                        )
                    })}
                </List>
            )}
        </div>

    }
    private play(id) {
        Observable.ajax(bodyUrl(API_URL() + "/playlists", this.props.token))
            .map((user) => {
                this.setState({ playlists: user.response })
            }).subscribe((success) => {
                console.log("done")
            })

    }
    private getTOP5() {
        Observable.ajax(bodyUrl(API_URL() + "/playlists", this.props.token))
            .map((user) => {
                this.setState({ playlists: user.response })
            }).subscribe((success) => {
                console.log("done")
            })

    }
    private playSong(follower) {
        this.props.dispatch({ type: "PLAY_SONG", payload: { token: this.props.token, song: follower.uri } })
    }
}

export const MyPlaylists = compose(connect())(MyPlaylistsClass)

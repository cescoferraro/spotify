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
import Divider from "material-ui/Divider"
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble"
import { AJAX } from "../../../shared/ajax"

export class Following extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.unfollow = this.unfollow.bind(this)
        this.Hey = this.Hey.bind(this)
        this.Toggle = this.Toggle.bind(this)
        this.getTOP5 = this.getTOP5.bind(this)
        this.state = {
            hidden: true,
            followers: []
        }
    }

    public render() {
        const artists = this.state.hidden ?
            null : this.state.followers.map(this.Hey)
        return (
            <div className={CSS.feature} >
                <RaisedButton
                    backgroundColor="black"
                    fullWidth={true}
                    className={CSS.selectButton}
                    secondary={true}
                    label="TOP5 ARTISTS"
                    onClick={this.Toggle}
                />
                <List>
                    {artists}
                </List>
            </div>
        )
    }

    private Toggle() {
        this.getTOP5()
        this.setState({ hidden: !this.state.hidden })
    }
    private makeSure(artist) {
        return artist.images[0] ? artist.images[0].url :
            "https://google.com/favicon.ico"
    }
    private Hey(artist) {
        const goUnfollow = () => { this.unfollow(artist.id) }
        return (
            <ListItem
                key={Math.random()}
                primaryText={artist.name}
                leftAvatar={<Avatar src={this.makeSure(artist)} />}
                rightIcon={<CommunicationChatBubble />}
                onClick={goUnfollow}
            />
        )
    }
    private unfollow(id) {
        AJAX("/unfollow/" + id, this.props.token)
            .map((user) => {
                const followers = this.state
                    .followers.filter((artist) => (artist.id !== id))
                this.setState({ followers })
            }).take(1).subscribe()
    }

    private getTOP5() {
        AJAX("/following", this.props.token)
            .map((user) => {
                this.setState({ followers: user.response.items })
            }).take(1).subscribe()
    }
}

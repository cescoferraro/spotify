import * as React from "react";
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import RaisedButton from 'material-ui/RaisedButton'
import { API_URL } from "../../../shared/api/index";
import * as CSS from "./main.css"
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
export class Following extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.unfollow = this.unfollow.bind(this)
        this.state = {
            hidden: true,
            followers: []
        };
    }

    unfollow(id) {
        Observable.ajax({
            url: API_URL() + "/unfollow/" + id,
            body: this.props.token,
            method: "POST",
            responseType: 'json',
            crossDomain: true
        })
            .map((user) => {
                const followers = this.state.followers.filter((artist) => (artist.id !== id))
                this.setState({ followers })
            }).take(1).subscribe((success) => {
                console.log("done")
            })

    }

    getTOP5() {
        Observable.ajax({
            url: API_URL() + "/following",
            body: this.props.token,
            method: "POST",
            responseType: 'json',
            crossDomain: true
        })
            .map((user) => {
                console.log(user.response)
                this.setState({ followers: user.response.items })
            }).take(1).subscribe((success) => {
                console.log("done")
            })

    }
    render() {
        return <div className={CSS.feature} >
            <RaisedButton
                backgroundColor="black"
                fullWidth={true}
                className={CSS.selectButton}
                secondary={true}
                label="TOP5 ARTISTS"
                onClick={() => {
                    this.getTOP5()
                    this.setState({ hidden: !this.state.hidden })
                }}
            />
            {this.state.hidden ? null : (
                <List>
                    {this.state.followers.map((artist) => {
                        console.log(artist)
                        return <ListItem
                            key={Math.random()}
                            primaryText={artist.name}
                            leftAvatar={<Avatar src={artist.images[0].url} />}
                            rightIcon={<CommunicationChatBubble />}
                            onClick={() => {
                                this.unfollow(artist.id)
                            }}
                        />
                    })}
                </List>
            )}
        </div>

    }

}

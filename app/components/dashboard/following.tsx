import * as React from "react";
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import RaisedButton from 'material-ui/RaisedButton'
import { API_URL } from "../../../shared/api/index";
import * as CSS from "./teste.css"
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
export class Following extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            followers: []
        };
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
            }).subscribe((success) => {
                console.log("done")
            })

    }
    render() {
        console.log(this)
        return <div className={CSS.feature} >
            <RaisedButton
                backgroundColor="black"
                fullWidth={true}
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
                        />
                    })}
                </List>
            )}
        </div>

    }

}

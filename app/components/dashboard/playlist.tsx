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

export class MyPlaylists extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            playlists: []
        };
    }
    getTOP5() {
        console.log("random")
        Observable.ajax({
            url: API_URL() + "/playlists",
            body: this.props.token,
            method: "POST",
            responseType: 'json',
            crossDomain: true
        })
            .map((user) => {
                console.log(user.response)
                this.setState({ playlists: user.response })
            }).subscribe((success) => {
                console.log("done")
            })

    }
    render() {
        console.log(this)
        const label = this.state.hidden ? "Show" : "Hide"
        return <div className={CSS.feature} >
            <RaisedButton
                fullWidth={true}
                label={label + " Playlists"}
                secondary={true}
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
                        return (
                            <ListItem
                                key={Math.random()}
                                primaryText={follower.name}
                                leftAvatar={<Avatar src={follower.images[0].url} />}
                                rightIcon={<CommunicationChatBubble />}
                            />
                        )
                    })}
                </List>
            )}
        </div>

    }

}

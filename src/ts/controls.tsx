import * as React from "react";
import * as MUI from "muicss/react";
import { Button, Row, Container, Col } from "muicss/react";
import * as Rx from "rx-dom";
import Utils from "./utils";


interface ControlsProps {
    code: string,
    playlists: Array<{id: string}>,
    profile: {id: string},
    updatePLaylistState: Function,
    updateProfileState: Function,
    updateFollowingState: Function
}


export default class Controls extends React.Component<ControlsProps, any> {

    PlaylistCall(action, user, playlist) {
        Rx.DOM.get("/playlist/" + action + "/" + user + "/" + playlist + "/" + this.props.code)
            .subscribe(this.props.updatePLaylistState)
    }

    addGuimeTrack2AllPlaylist() {
        this.props.playlists.map(
            (data, index) => {
                Rx.DOM.get("/tracks/add/" + this.props.profile.id + "/" + this.props.playlists[ index ].id + "/7AD7hNwGOOSRe33QtnyprD/" + this.props.code)
                    .subscribe(this.props.updatePLaylistState)
            }
        )
    }

    Indications() {
        return
    }

    FollowCall(action, artist) {
        Rx.DOM.get("/" + action + "/" + artist + "/" + Utils.GetCode("code"))
            .subscribe(this.props.updateFollowingState.bind(this))
    }

    render() {
        let full = {
            width: '100%',
            color: 'black',
            backgroundColor: '#6AE368'
        };
        return (
            <div>
                <MUI.Row>
                    <MUI.Button
                        onClick={this.PlaylistCall.bind(this, "add", "12186321310", "1aOShUzf52UXuPAFSZ4BDC")}
                        style={full} color="danger">Add
                        Random
                        Playlist</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger"
                                onClick={this.PlaylistCall.bind(this, "remove", "12186321310", "1aOShUzf52UXuPAFSZ4BDC")}>Remove
                        Random
                        Playlist</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger" onClick={this.Indications.bind(this)}>
                        Get New Indications</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger" onClick={this.addGuimeTrack2AllPlaylist.bind(this)}>
                        Add Guimé Song to your Playlists</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger"
                                onClick={this.FollowCall.bind(this, "unfollow", "3TVXtAsR1Inumwj472S9r4")}>
                        Unfollow Drake</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger"
                                onClick={this.FollowCall.bind(this, "unfollow", "3ge4xOaKvWfhRwgx0Rldov")}>
                        Unfollow Guimé</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger"
                                onClick={this.FollowCall.bind(this, "follow", "3TVXtAsR1Inumwj472S9r4")}>
                        Follow Drake</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger"
                                onClick={this.FollowCall.bind(this, "follow", "3ge4xOaKvWfhRwgx0Rldov")}>
                        Follow Guimé</MUI.Button>
                </MUI.Row>
                <MUI.Row>
                    <MUI.Button style={full} color="danger" onClick={() => {
                        this.props.updateFollowingState();
                        this.props.updatePLaylistState();
                        this.props.updateProfileState();
                    }}> Refresh</MUI.Button>
                </MUI.Row>
            </div>
        );
    }

}
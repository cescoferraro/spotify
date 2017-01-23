import * as React from "react";
import * as Rx from "rx-dom";
import Utils from "../../../shared/utils";
import * as cx from "classnames";
declare let require: any;
let styles = require("./controls.pcss");
declare let window: any;
import Button from "material-ui/RaisedButton";

interface ControlsProps {
    code: string;
    playlists: Array<{id: string}>;
    profile: {id: string};
    updatePLaylistState: Function;
    updateProfileState: Function;
    updateFollowingState: Function;
}


export default class Controls extends React.Component<ControlsProps, any> {

    PlaylistCall(action, user, playlist) {
        Rx.DOM.get("/playlist/" + action + "/" + user + "/" + playlist + "/" + this.props.code)
            .subscribe(this.props.updatePLaylistState);
    }

    logout() {
        window.location.href = window.location.origin;
    }

    addGuimeTrack2AllPlaylist() {
        this.props.playlists.map(
            (data, index) => {
                Rx.DOM.get("/tracks/add/" + this.props.profile.id + "/" + this.props.playlists[index].id + "/7AD7hNwGOOSRe33QtnyprD/" + this.props.code)
                    .subscribe(this.props.updatePLaylistState);
            }
        );
    }

    Indications() {
        return;
    }

    FollowCall(action, artist) {
        Rx.DOM.get("/" + action + "/" + artist + "/" + Utils.GetCode("code"))
            .subscribe(this.props.updateFollowingState.bind(this));
    }

    render() {
        return (
            <div className={cx(styles.controls)}>

                <Button
                    onClick={this.PlaylistCall.bind(this, "add", "12186321310", "1aOShUzf52UXuPAFSZ4BDC")}
                    className={styles.button}>
                    FUNK PLAYLIST
                </Button>
                <Button className={styles.button}
                        onClick={this.PlaylistCall.bind(this, "remove", "12186321310", "1aOShUzf52UXuPAFSZ4BDC")}>
                    HEEH
                </Button>
                <Button className={styles.button}
                        onClick={this.Indications.bind(this)}>
                    Get New Indications
                </Button>
                <Button className={styles.button}
                        onClick={this.addGuimeTrack2AllPlaylist.bind(this)}>
                    Add Guimé Song to your Playlists
                </Button>
                <Button className={styles.button}
                        onClick={this.FollowCall.bind(this, "unfollow", "3TVXtAsR1Inumwj472S9r4")}>
                    Unfollow Drake
                </Button>
                <Button className={styles.button}
                        onClick={this.FollowCall.bind(this, "unfollow", "3ge4xOaKvWfhRwgx0Rldov")}>
                    Unfollow Guimé
                </Button>
                <Button className={styles.button}
                        onClick={this.FollowCall.bind(this, "follow", "3TVXtAsR1Inumwj472S9r4")}>
                    Follow Drake
                </Button>
                <Button className={styles.button}
                        onClick={this.FollowCall.bind(this, "follow", "3ge4xOaKvWfhRwgx0Rldov")}>
                    Follow Guimé
                </Button>
            </div>
        );
    }

}

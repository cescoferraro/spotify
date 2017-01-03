import * as React from "react";
import * as Rx from "rx-dom";
import Utils from "../../shared/utils";
import PlaylistList from "./playlists/playlist.list";
import Following from "./following/following";
import Recommendations from "./recommendations/recommendations";
import Picture from "./picture/picture";
import Profile from "./profile";
import Controls from "./controls/controls";


declare let require: any;
let styles = require("./dashboard.pcss");

export default class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let placeholder = "https:\/\/goo.gl/UO3J6T";
        this.state = {
            recommendation: {tracks: [{name: "", external_urls: {spotify: "sdf"}}]},
            playlists: [],
            following: {items: []},
            profile: {
                images: [{url: placeholder}],
                id: "initial",
                email: "guest@guest.com"
            }
        };
        this.updateRecommendationsState();
        this.updateFollowingState();
        this.updateProfileState();
        this.updatePLaylistState();
    }

    updateFollowingState() {
        Rx.DOM.get("/following/" + Utils.GetCode("code"))
            .retry(3)
            .catch(this.catchErrors)
            .subscribe((xhr) => {
                this.state.following = JSON.parse(xhr.response);
                this.setState(this.state);
                this.updateRecommendationsState();


            });
    }

    updatePLaylistState() {
        Rx.DOM.get("/playlist/" + Utils.GetCode("code"))
            .retry(3)
            .catch(this.catchErrors)
            .subscribe(
                (xhr) => {
                    this.state.playlists = JSON.parse(xhr.response);
                    this.setState(this.state);
                });
    }

    catchErrors() {
        console.log("sdkjfnjksdf");
    }

    updateRecommendationsState() {
        let artists = [];
        this.state.following.items.map((artist) => {
            artists.push(artist.id);
        });
        if (artists.length !== 0) {
            Rx.DOM.post("/recommendations/" + Utils.GetCode("code"), JSON.stringify(artists))
                .retry(3)
                .catch(this.catchErrors)
                .subscribe(
                    (xhr) => {
                        this.state.recommendation = JSON.parse(xhr.response);
                        this.setState(this.state);
                    });
        }

    }


    updateProfileState() {
        Rx.DOM.get("/me/" + Utils.GetCode("code"))
            .retry(3)
            .catch(this.catchErrors)
            .subscribe(
                (xhr) => {
                    this.state.profile = JSON.parse(xhr.response);
                    this.setState(this.state);
                });

    }


    render() {
        let plays, recom, foll;

        if (this.state.following.items.length !== 0) {
            {
                foll = <Following following={this.state.following}/>;
            }


        }

        if (this.state.recommendation != null) {
            recom = <Recommendations recommendation={this.state.recommendation}/>;
        } else {
            recom = <h2>No Recommendations for you Today!</h2>;
        }

        return (<div className={styles.container}>
            <div className={styles.sideBar}>
                <Picture image={this.state.profile.images[0].url}/>

                <Controls
                    code={Utils.GetCode("code")}
                    profile={this.state.profile}
                    playlists={this.state.playlists}
                    updateProfileState={this.updateProfileState.bind(this)}
                    updatePLaylistState={this.updatePLaylistState.bind(this)}
                    updateFollowingState={this.updateFollowingState.bind(this)}/>

            </div>
            <div className={styles.content}>
                <Profile profile={this.state.profile}/>
                {foll}
                {recom}
                { this.state.playlists[0] != null ?
                    <PlaylistList playlists={this.state.playlists}/> :
                    <h2>You do not have any Playlists!</h2>}

            </div>

        </div>);
    }
}

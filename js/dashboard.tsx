import * as React from "react";
import * as Rx from "rx-dom";
import * as MUI from "muicss/react";
import Utils from "./utils";
import Profile from "./profile";
import Controls from "./controls";
import Picture from "./picture";
import Playlists from "./playlists";
import Following from "./following";
import Recommendations from "./recommendations";


export class Dashboard extends React.Component<any,any> {
    constructor(props) {
        super(props);
        let placeholder = "https:\/\/goo.gl/UO3J6T";
        this.state = {
            recommendation: {tracks: [ {name: "", external_urls: {spotify: "sdf"}} ]},
            playlists: [],
            following: {items: []},
            profile: {
                images: [ {url: placeholder} ],
                id: "initial",
                email: "guest@guest.com"
            }
        };
        this.updateRecommendationsState();
        this.updatePLaylistState();
        this.updateFollowingState();
        this.updateProfileState();

    }

    updateFollowingState() {
        Rx.DOM.get("/following/" + Utils.GetCode("code"))
            .subscribe((xhr) => {
                this.state.following = JSON.parse(xhr.response);
                this.setState(this.state);
                this.updateRecommendationsState();
            });
    }

    updatePLaylistState() {
        Rx.DOM.get("/playlist/" + Utils.GetCode("code"))
            .subscribe(
                (xhr) => {
                    this.state.playlists = JSON.parse(xhr.response);
                    this.setState(this.state);
                });
    }

    //
    updateRecommendationsState() {
        let artists = [];
        this.state.following.items.map((artist) => {
            artists.push(artist.id);
        });
        if (artists.length != 0) {
            Rx.DOM.post("/recommendations/" + Utils.GetCode("code"), JSON.stringify(artists))
                .subscribe(
                    (xhr) => {
                        this.state.recommendation = JSON.parse(xhr.response);
                        this.setState(this.state);
                    });
        }

    }


    updateProfileState() {
        Rx.DOM.get("/me/" + Utils.GetCode("code"))
            .subscribe(
                (xhr) => {
                    console.log(JSON.parse(xhr.response));
                    this.state.profile = JSON.parse(xhr.response);
                    this.setState(this.state);
                });

    }


    render() {
        let plays, recom, foll;
        console.log(this.state.profile);


        if (this.state.following.items.length != 0) {
            {
                foll = <Following following={this.state.following}/>;
            }
            console.log(this.state.following);


            if (this.state.recommendation != null) {
                console.log("about to create recommendation component")
                console.log(this.state.recommendation)
                recom = <Recommendations recommendation={this.state.recommendation}/>;
            } else {
                plays = <h2>No Recommendations for you Today!</h2>;

            }
        } else {
            plays = <h2>You are not following anyone!</h2>;

        }


        if (this.state.playlists[ 0 ] != null) {
            plays = <Playlists playlists={this.state.playlists}/>;
        } else {
            plays = <h2>You do not have any Playlists!</h2>;
        }


        return (<div>
            <MUI.Row>
                <MUI.Col md="4">
                    <MUI.Container>
                        <Picture image={this.state.profile.images[0].url}/>
                        <Controls
                            code={Utils.GetCode("code")}
                            profile={this.state.profile}
                            playlists={this.state.playlists}
                            updateProfileState={this.updateProfileState.bind(this)}
                            updatePLaylistState={this.updatePLaylistState.bind(this)}
                            updateFollowingState={this.updateFollowingState.bind(this)}/>
                    </MUI.Container>
                </MUI.Col>
                <MUI.Col md="8">
                    <MUI.Container>
                        <Profile profile={this.state.profile}/>
                        {foll}
                        {recom}
                        {plays}
                    </MUI.Container>
                </MUI.Col>
            </MUI.Row>

        </div>)
    }
}


import * as React from "react";
import {Component} from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {APP_OBJECT} from "../../reducers/app";
import {connect} from "react-redux";
import {DASH_OBJECT} from "../../reducers/dashboard";
import Utils from "../../shared/utils";
import * as Rx from "rx-lite-dom";
import Link from "react-router/Link";

import Snackbar from 'material-ui/Snackbar';
type DrawerProps = {
    app: APP_OBJECT,
    update: Function,
    dashboard: DASH_OBJECT,
    TOOGLE_SIDE_BAR()
}


export class DrawerComponent extends Component<DrawerProps, any> {

    constructor(props) {
        super(props);

    }


    FollowCall(action, artist) {
        Rx.DOM.get(Utils.API_URL() + "/" + action + "/" + artist + "/" + Utils.GetCode("code"))
            .subscribe(this.props.update.bind(this));
    }

    LogOut() {
        Rx.DOM.get(Utils.API_URL() + "/logout/" + Utils.GetCode("code"))
            .subscribe((data: XMLHttpRequest) => {
                window.location.href = "/";
                // TODO: CLEANUP REDUX STORE!
            });
    }

    followLabelTop5(label: string) {
        Rx.DOM.get(Utils.API_URL() + "/top5/" + label + "/" + Utils.GetCode("code"))
            .subscribe(
                (xhr: XMLHttpRequest) => {
                    console.log(JSON.parse(xhr.response));
                    this.props.update();
                });
    }

    render() {
        let following = JSON.parse(
            JSON.stringify(this.props.dashboard.following.items));

        let random2Artist = JSON.parse(
            JSON.stringify(this.props.dashboard.following.items))
            .splice(-2, 2);

        return (


            <div>
                <Drawer docked={false} width={200}
                        open={this.props.app.sidebar}
                        onRequestChange={this.props.TOOGLE_SIDE_BAR}>

                    <MenuItem
                        onClick={this.props.update}>
                        Update App
                    </MenuItem>


                    {following.length === 0 ?
                        <div>
                            <MenuItem key={Math.random()}
                                      onClick={this.FollowCall.bind(this, "follow", "1HY2Jd0NmPuamShAr6KMms")}>
                                Follow Lady Gaga
                            </MenuItem>
                            <MenuItem key={Math.random()}
                                      onClick={this.FollowCall.bind(this, "follow", "3TVXtAsR1Inumwj472S9r4")}>
                                Follow Drake
                            </MenuItem>
                        </div> : null}

                    {random2Artist.map((artist) => {
                        let unfollow = this.FollowCall.bind(this, "unfollow", artist.id);
                        return (
                            <MenuItem key={Math.random()}
                                      onClick={unfollow}>
                                Unfollow {artist.name}
                            </MenuItem>)
                    })}

                    <MenuItem
                        onClick={this.followLabelTop5.bind(this,"universal")}>
                        Follow Top 5 Universal
                    </MenuItem>
                    <MenuItem
                        onClick={this.followLabelTop5.bind(this,"sony")}>
                        Follow Top 5 Sony
                    </MenuItem>
                    <MenuItem
                        onClick={this.LogOut.bind(this)}>
                        Log out
                    </MenuItem>


                </Drawer>
            </div>
        )
    };
}

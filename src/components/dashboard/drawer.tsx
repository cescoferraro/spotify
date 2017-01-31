import * as React from "react";
import {Component} from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {APP_OBJECT} from "../../reducers/app";
import {connect} from "react-redux";
import {DASH_OBJECT} from "../../reducers/dashboard";
import Utils from "../../shared/utils";
import * as Rx from "rx-lite-dom";

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

    render() {
        let following = JSON.parse(
            JSON.stringify(this.props.dashboard.following.items));

        let random2Artist = JSON.parse(
            JSON.stringify(this.props.dashboard.following.items))
            .splice(-2, 2);

        return (

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
            </Drawer>
        )
    };
}

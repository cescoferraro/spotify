import Subheader from 'material-ui/Subheader';
import * as React from "react";
import { Component } from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { APP_OBJECT } from "../../../reducers/app";
import { connect } from "react-redux";
import { DASH_OBJECT } from "../../../reducers/dashboard";
import Utils from "../../../shared/utils";
import * as Rx from "rx-lite-dom";


type DrawerProps = {
    app: APP_OBJECT,
    update: Function,
    dashboard: DASH_OBJECT,
    TOOGLE_SIDE_BAR()
}
const MySubH = ({label}) => (
    <Subheader style={{ color: "#000000" }}> {label} </Subheader>
)
const CSS = require("../css/dashboard.pcss")

const MyMenu = ({click, label}) => (
    <MenuItem
        style={{ color: "#000000" }}
        onClick={click}>
        {label}
    </MenuItem>
)

let GoogleDrive = require("-!babel-loader!svg-react-loader!../../shell/logo.svg");

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
                <Drawer
                    containerStyle={{ backgroundColor: "#6AE368" }}
                    docked={false} width={200}
                    open={this.props.app.sidebar}
                    onRequestChange={this.props.TOOGLE_SIDE_BAR}>
                    <div className={CSS.container}>
                        <GoogleDrive
                            className={CSS.fill}
                            style={{
                                height: '88px',
                                fill: 'black', width: '88px'
                            }} />
                    </div>
                    <div>
                        <MySubH label="General" />
                        <MyMenu label="Update App" click={this.props.update} />
                        <MyMenu label="LOG OUT" click={this.LogOut.bind(this)} />
                    </div>
                    {following.length === 0 ?
                        <div>
                            <MySubH label="Follow" />
                            <MyMenu label="Follow Gaga" click={this.FollowCall.bind(this, "follow", "1HY2Jd0NmPuamShAr6KMms")} />
                            <MyMenu label="Follow Drake" click={this.FollowCall.bind(this, "follow", "3TVXtAsR1Inumwj472S9r4")} />
                        </div> : null}
                    <div>
                        <MySubH label="Unfollow" />
                        {random2Artist
                            .map((artist) => (
                                <MyMenu
                                    key={Math.random()}
                                    label={"Unfollow " + artist.name}
                                    click={this.FollowCall.bind(this, "unfollow", artist.id)}
                                    />
                            ))}
                    </div>
                    <div>
                        <MySubH label="Follow" />
                        <MyMenu label="TOP 5 UNIVERSAL" click={this.followLabelTop5.bind(this, "universal")} />
                        <MyMenu label="TOP 5 SONY" click={this.followLabelTop5.bind(this, "sony")} />
                    </div>
                </Drawer>
            </div>
        )
    };
}

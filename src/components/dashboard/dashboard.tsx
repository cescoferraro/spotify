import * as React from "react";
import * as Rx from "rx-dom";
import {Observable} from "rx-dom";
import Utils from "../../shared/utils";
import Config from "../../app/config";
import {Grid, Cell} from "radium-grid";
import {StyleRoot} from "radium";
import {Link} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import {SET_APP_VERSION, APP_OBJECT, SET_APP_BAR_MENU, TOOGLE_SIDE_BAR} from "../../reducers/app";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {
    DASH_OBJECT,
    SET_DASHBOARD_FOLLOWING,
    SET_DASHBOARD_PROFILE,
    SET_DASHBOARD_PLAYLIST,
    Playlist,
    Following,
    Profile,
    SET_DASHBOARD_RECOMMENDATIONS,
    Recommendations
} from "../../reducers/dashboard";
import {FollowingComponent} from "./following";
import {PlaylistsComponent} from "./playlists";
import {RecommendationsComponent} from "./recommendations";
import {default as DrawerUndockedExample2} from "./drawer";
declare let require: any;

interface StateProps {
    app: APP_OBJECT,
    dashboard: DASH_OBJECT
}

interface DispatchProps {
    SET_APP_VERSION(version: string);
    SET_DASHBOARD_FOLLOWING(following: Following)
    SET_DASHBOARD_PROFILE(profile: Profile)
    SET_DASHBOARD_RECOMMENDATIONS(recommendation: Recommendations)
    SET_DASHBOARD_PLAYLIST(profile: Playlist)
    SET_APP_BAR_MENU(component: JSX.Element)
    TOOGLE_SIDE_BAR()
}


const mapStateToProps = (state) => ({
    app: state.app,
    dashboard: state.dashboard
});

const mapDispatchToPmapStaterops = (dispatch) => {
    return bindActionCreators(
        {
            SET_APP_VERSION: SET_APP_VERSION,
            SET_DASHBOARD_PROFILE: SET_DASHBOARD_PROFILE,
            SET_DASHBOARD_FOLLOWING: SET_DASHBOARD_FOLLOWING,
            SET_DASHBOARD_RECOMMENDATIONS: SET_DASHBOARD_RECOMMENDATIONS,
            SET_DASHBOARD_PLAYLIST: SET_DASHBOARD_PLAYLIST,
            SET_APP_BAR_MENU: SET_APP_BAR_MENU,
            TOOGLE_SIDE_BAR: TOOGLE_SIDE_BAR
        }, dispatch);
};


@connect<StateProps,DispatchProps,any>(mapStateToProps, mapDispatchToPmapStaterops)
export default class Dashboard extends React.Component<StateProps & DispatchProps, any> {
    constructor(props) {
        super(props);
        if (!Utils.isServer()) {
            this.appversion();
            this.updateProfileState();
        }
    }

    componentWillMount() {
        this.props.SET_APP_BAR_MENU(
            <IconButton >
                <MoreVertIcon
                    onClick={this.props.TOOGLE_SIDE_BAR}

                />
            </IconButton>);
    }

    catchErrors(err, ss) {
        console.log("ERROR");
        console.log("err");
        console.log(err);
        console.log("ss");
        console.log(ss);
        return Observable.empty();

    }


    updateProfileState() {
        Rx.DOM.get(Utils.API_URL() + "/me/" + Utils.GetCode("code"))
            .catch(this.catchErrors)
            .subscribe(
                (xhr) => {
                    let me = JSON.parse(xhr.response);
                    this.props.SET_DASHBOARD_PROFILE(me.User);
                    this.props.SET_DASHBOARD_FOLLOWING(me.Following);
                    this.props.SET_DASHBOARD_PLAYLIST(me.Playlist);
                    this.props.SET_DASHBOARD_RECOMMENDATIONS(me.Recommendations);
                });
    }

    appversion() {
        Rx.DOM.get(Utils.API_URL() + "/version")
            .catch(this.catchErrors)
            .subscribe(
                (xhr) => {
                    this.props.SET_APP_VERSION(JSON.parse(xhr.response))
                });
    }


    render() {
        return (
            <StyleRoot>
                <DrawerUndockedExample2
                    app={this.props.app}
                    TOOGLE_SIDE_BAR={this.props.TOOGLE_SIDE_BAR}
                />
                <div >
                    <div style={{height:"64px"}}></div>
                    <Grid>
                        <Cell width="1">
                            <div style={{ maxWidth: "95%",width: "95vw",   margin: "0 auto" }}>
                                <Card >
                                    {this.props.app.sidebar === true ? <div>true</div>:
                                        <div>false</div>                                   }
                                    <CardHeader
                                        title={this.props.dashboard.profile.id}
                                        subtitle={this.props.dashboard.profile.email}
                                        avatar={this.props.dashboard.profile.images[0].url}
                                        width="1"/>
                                    <CardText>
                                        <FollowingComponent following={this.props.dashboard.following}/>
                                        <PlaylistsComponent playlists={this.props.dashboard.playlist}/>
                                        <RecommendationsComponent
                                            recommendations={this.props.dashboard.recommendations}/>
                                    </CardText>
                                </Card>
                            </div>
                        </Cell>
                    </Grid>
                </div>
            </StyleRoot>);
    }
}

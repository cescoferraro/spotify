import * as React from "react";
import * as Rx from "rx-lite-dom";
import {Observable} from "rx-lite-dom";
import Utils from "../../shared/utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import {SET_APP_VERSION, APP_OBJECT, SET_APP_BAR_MENU, TOOGLE_SIDE_BAR} from "../../reducers/app";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {
    SET_DASHBOARD_FOLLOWING,
    SET_DASHBOARD_PROFILE,
    SET_DASHBOARD_PLAYLIST,
    Recommendations,
    DASH_OBJECT,
    Playlist,
    Following,
    Profile,
    SET_DASHBOARD_RECOMMENDATIONS
} from "../../reducers/dashboard";
import {FollowingComponent} from "./following";
import {PlaylistsComponent} from "./playlists";
import {RecommendationsComponent} from "./recommendations";
import {DrawerComponent} from "./drawer";
import withStyles from "isomorphic-style-loader/lib/withStyles";

let ss = require('./dashboard.pcss');
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
class Dashboard extends React.Component<StateProps & DispatchProps, any> {
    constructor(props) {
        super(props);
        if (!Utils.isServer()) {
            this.appversion();
            this.updateProfileState();
        }
        this.state = {
            open: true,
        };
    }


    handleTouchTap = () => {
        console.log("handleTouchTap")
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentWillMount() {
        this.props.SET_APP_BAR_MENU(<IconButton >
            <MoreVertIcon onClick={this.props.TOOGLE_SIDE_BAR}/>
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

            <div>
                <DrawerComponent
                    app={this.props.app}
                    dashboard={this.props.dashboard}
                    update={this.updateProfileState.bind(this)}
                    TOOGLE_SIDE_BAR={this.props.TOOGLE_SIDE_BAR}
                />
                <Card width="1" className={ss.dashboard}>
                    <CardHeader
                        title={this.props.dashboard.profile.display_name}
                        subtitle={this.props.dashboard.profile.email}
                        avatar={this.props.dashboard.profile.images[0].url}
                        width="1"/>
                    <CardText>
                        <PlaylistsComponent playlists={this.props.dashboard.playlist}/>
                        <FollowingComponent following={this.props.dashboard.following}/>
                        <RecommendationsComponent
                            recommendations={this.props.dashboard.recommendations}/>
                    </CardText>
                </Card>
            </div>);
    }
}

export default withStyles(ss)(Dashboard);


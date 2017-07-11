import * as React from "react";
import * as Rx from "rx-lite-dom";
import { Observable } from "rx-lite-dom";
import Utils from "../../shared/utils";
import { connect } from "react-redux";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import { FollowingComponent } from "./hoc/following";
import { PlaylistsComponent } from "./hoc/playlists";
import { RecommendationsComponent } from "./hoc/recommendations";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { mapStateToProps, mapDispatchToPmapStaterops } from "./redux";
import { DrawerComponent } from "./hoc/drawer";
let ss = require('./css/dashboard.pcss');
declare let require: any;


@connect<any, any, any>(mapStateToProps, mapDispatchToPmapStaterops)
class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        if (!Utils.isServer()) {
            this.updateProfileState();
        }
    }


    componentWillMount() {
        let menuIcon =
            <IconButton onClick={this.props.TOOGLE_SIDE_BAR}>
                <MoreVertIcon />
            </IconButton>;
        this.props.SET_APP_BAR_MENU(menuIcon);
    }

    catchErrors(err, ss) {
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


    render() {
        return (
            <div className={ss.back}>
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
                        width="1" />
                    <CardText>
                        <PlaylistsComponent playlists={this.props.dashboard.playlist} />
                        <FollowingComponent following={this.props.dashboard.following} />
                        <RecommendationsComponent
                            recommendations={this.props.dashboard.recommendations} />
                    </CardText>
                </Card>
            </div>);
    }
}

export default withStyles(ss)(Dashboard);

import * as React from "react";
import * as Rx from "rx-dom";
import {Observable} from "rx-dom";
import Utils from "../../shared/utils";
import Config from "../../app/config";
import {Grid, Cell} from "radium-grid";
import {StyleRoot} from "radium";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import {SET_APP_VERSION, APP_OBJECT, SET_APP_BAR_MENU} from "../../reducers/app";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {
    DASH_OBJECT,
    Track,
    SET_DASHBOARD_FOLLOWING,
    SET_DASHBOARD_PROFILE,
    SET_DASHBOARD_PLAYLIST,
    Playlist,
    Following,
    Profile,
    SET_DASHBOARD_RECOMMENDATIONS,
    Recommendations,
    Artist
} from "../../reducers/dashboard";
declare let require: any;

interface StateProps {
    app: APP_OBJECT,
    dashboard: DASH_OBJECT
}

interface DispatchProps {
    CHANGE_APP_VERSION(version: string);
    SET_DASHBOARD_FOLLOWING(following: Following)
    SET_DASHBOARD_PROFILE(profile: Profile)
    SET_DASHBOARD_RECOMMENDATIONS(recommendation: Recommendations)
    SET_DASHBOARD_PLAYLIST(profile: Playlist)
    SET_APP_BAR_MENU(component: JSX.Element)
}


const mapStateToProps = (state) => ({
    app: state.app,
    dashboard: state.dashboard
});

const mapDispatchToPmapStaterops = (dispatch) => {
    return bindActionCreators(
        {
            CHANGE_APP_VERSION: SET_APP_VERSION,
            SET_DASHBOARD_PROFILE: SET_DASHBOARD_PROFILE,
            SET_DASHBOARD_FOLLOWING: SET_DASHBOARD_FOLLOWING,
            SET_DASHBOARD_RECOMMENDATIONS: SET_DASHBOARD_RECOMMENDATIONS,
            SET_DASHBOARD_PLAYLIST: SET_DASHBOARD_PLAYLIST,
            SET_APP_BAR_MENU: SET_APP_BAR_MENU
        }, dispatch);
};

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
        targetOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "top"}}
    >
        <MenuItem primaryText="Refresh"/>
        <MenuItem primaryText="Help"/>
        <MenuItem onClick={()=>{window.location.href= document.location.origin}} primaryText="Sign out"/>
    </IconMenu>
);

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
        this.props.SET_APP_BAR_MENU(Logged(null));
    }

    catchErrors() {
        console.log("ERROR");
        return Observable.empty();

    }

    sendBarMenu() {
        console.log("sendBarMenu");
    }


    updateProfileState() {
        Rx.DOM.get(Config.API_URL() + "/me/" + Utils.GetCode("code"))
            .catch(this.catchErrors)
            .subscribe(
                (xhr) => {
                    let me = JSON.parse(xhr.response);
                    console.log(me);
                    this.props.SET_DASHBOARD_PROFILE(me.User);
                    this.props.SET_DASHBOARD_FOLLOWING(me.Following);
                    this.props.SET_DASHBOARD_PLAYLIST(me.Playlist);
                    this.props.SET_DASHBOARD_RECOMMENDATIONS(me.Recommendations);
                });
    }

    appversion() {
        Rx.DOM.get(Config.API_URL() + "/version")
            .catch(this.catchErrors)
            .subscribe(
                (xhr) => {
                    console.log(xhr);
                    this.props.CHANGE_APP_VERSION(JSON.parse(xhr.response))
                });
    }


    render() {
        return (
            <StyleRoot>

                <div >
                    <div style={{height:"64px"}}>

                    </div>
                    <Grid style={{}}>
                        <Cell width="1">

                            <div style={{ maxWidth: "95%",width: "95%",   margin: "0 auto" }}>
                                <Card >

                                    <CardHeader
                                        title={this.props.dashboard.profile.id}
                                        subtitle={this.props.dashboard.profile.email}
                                        avatar={this.props.dashboard.profile.images[0].url}
                                        width="1"/>


                                    <CardText>
                                        <h3>Following:</h3>
                                        {this.props.dashboard.following.items.map((artist) => {
                                            return (<CardHeader
                                                key={Math.random()}
                                                title={artist.id}
                                                subtitle={artist.name}
                                                avatar={artist.images[0].url}
                                                width="1"/>)
                                        })}

                                        <h3>Playlists:</h3>
                                        {this.props.dashboard.playlist.map((playlist: Playlist) => {
                                            return (<CardHeader key={Math.random()}
                                                                title={playlist.id}
                                                                subtitle={playlist.name}
                                                                avatar={playlist.images[0].url}
                                                                width="1"


                                            />)
                                        })}

                                        <h3>Recommendations:</h3>
                                        {this.props.dashboard.recommendations.tracks.map((track: Track) => {
                                            console.log();
                                            let artistsName = "";
                                            track.artists.map((artist: Artist, index) => {

                                                artistsName = artistsName + artist.name;
                                                if (track.artists.length !== index + 1) {

                                                    artistsName = artistsName + " & ";
                                                }

                                            });


                                            return (<CardHeader
                                                onClick={()=>{
                                                    if (!Utils.isServer()){

                                       window.open(track.preview_url, "_blank").focus();
                                                    }

                                                                }}
                                                key={Math.random()}
                                                title={artistsName}
                                                subtitle={track.name}
                                            />)
                                        })}
                                    </CardText>
                                </Card>
                            </div>
                        </Cell>
                    </Grid>
                </div>
            </StyleRoot>);
    }
}



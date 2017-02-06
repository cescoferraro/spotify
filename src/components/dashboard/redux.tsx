import {APP_OBJECT, SET_APP_VERSION, SET_APP_BAR_MENU, TOOGLE_SIDE_BAR} from "../../reducers/app";
import {
    DASH_OBJECT,
    Following,
    Profile,
    Recommendations,
    Playlist,
    SET_DASHBOARD_PROFILE,
    SET_DASHBOARD_FOLLOWING,
    SET_DASHBOARD_RECOMMENDATIONS,
    SET_DASHBOARD_PLAYLIST
} from "../../reducers/dashboard";
import {bindActionCreators} from "redux";
declare let require: any;

export interface StateProps {
    app: APP_OBJECT,
    dashboard: DASH_OBJECT
}

export interface DispatchProps {
    SET_APP_VERSION(version: string);
    SET_DASHBOARD_FOLLOWING(following: Following)
    SET_DASHBOARD_PROFILE(profile: Profile)
    SET_DASHBOARD_RECOMMENDATIONS(recommendation: Recommendations)
    SET_DASHBOARD_PLAYLIST(profile: Playlist)
    SET_APP_BAR_MENU(component: JSX.Element)
    TOOGLE_SIDE_BAR()
}


export const mapStateToProps = (state) => ({
    app: state.app,
    dashboard: state.dashboard
});
export const mapDispatchToPmapStaterops = (dispatch) => {
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



import Action from "./action";
import {handleActions} from "redux-actions";

type Image = {
    url?: string;
    width?: number;
    height?: number;
}

export  type Profile = {
    display_name?: string;
    email?: string;
    id?: string;
    images?: Array<Image>;
}

type Followers = {
    total?: number;
    href: string;
}

export interface Artist {
    name: string;
    id?: string;
    href?: string;
    images?: Array<Image>;
    genres?: Array<any>;
    Followers?: Followers;
}


export  type Following = {
    items?: Array<Artist>;
    limit?: number;
    href?: string;
    images?: Array<Image>;
}
export type TrackTotal = {
    href?: string;
    total?: number;
}


export type Track = {
    href?: string;
    name?: string;
    id?: string;
    duration_ms?: number;
    disc_number?: number;
    preview_url?: string;
    artists?: Array<Artist>;
}

export interface Playlist {
    name: string;
    id?: string;
    uri?: string;
    href?: string;
    tracks?: Array<Track>;
    images?: Array<Image>;
}

export interface Recommendations {
    seeds?: Array<any>;
    tracks?: Array<Track>;
}


export type DASH_OBJECT = {
    following: Following,
    profile: Profile,
    playlist: Array<Playlist>,
    recommendations: Recommendations

}
export const DASHBOARD_DEFAULT_VALUES = {
    profile: {email: "whatever@gmail.com", id: "bu253792g", images: [{url: "https:\/\/goo.gl/UO3J6T"}]},
    playlist: [{
        id: "bu253792g", images: [{url: "https:\/\/goo.gl/UO3J6T"}], name: "playlist"

    }],
    recommendations: {
        seeds: [],
        tracks: [{
            artists: [{
                name: "zé ngn",
                id: "487o52y",
                href: "http://google.com"
            }


            ], id: "bu253792g", images: [{url: "https:\/\/goo.gl/UO3J6T"}], name: "playlist"

        }]

    },
    following: {
        items: [{
            name: "zé ngn",
            id: "487o52y",
            genres: [],
            href: "http://google.com",
            images: [{url: "https:\/\/goo.gl/UO3J6T"}]
        }]
    }
};


export const FOLLOWING_ACTION = "SET_DASHBOARD_FOLLOWING";
export function SET_DASHBOARD_FOLLOWING(following: Following) {
    return {
        type: FOLLOWING_ACTION,
        payload: {
            following: following
        }
    }
}
export const PROFILE_ACTION = "SET_DASHBOARD_PROFILE";
export function SET_DASHBOARD_PROFILE(profile: Profile) {
    return {
        type: PROFILE_ACTION,
        payload: {
            profile: profile
        }
    }
}

export const PLAYLIST_ACTION = "SET_DASHBOARD_PLAYLIST";
export function SET_DASHBOARD_PLAYLIST(playlist: Playlist) {
    return {
        type: PLAYLIST_ACTION,
        payload: {
            playlist: playlist
        }
    }
}


export const RECOMMENDATIONS_ACTION = "SET_DASHBOARD_RECOMMENDATIONS";
export function SET_DASHBOARD_RECOMMENDATIONS(recommendations: Recommendations) {
    return {
        type: RECOMMENDATIONS_ACTION,
        payload: {
            recommendations: recommendations
        }
    }
}

const dashboard = handleActions({
    [FOLLOWING_ACTION]: (state: DASH_OBJECT, action: Action<DASH_OBJECT>): DASH_OBJECT => {
        return {
            profile: state.profile,
            following: action.payload.following,
            playlist: state.playlist,
            recommendations: state.recommendations
        };
    },

    [PROFILE_ACTION]: (state: DASH_OBJECT, action: Action<DASH_OBJECT>): DASH_OBJECT => {

        return {
            following: state.following,
            profile: action.payload.profile,
            playlist: state.playlist,
            recommendations: state.recommendations
        };
    },


    [PLAYLIST_ACTION]: (state: DASH_OBJECT, action: Action<DASH_OBJECT>): DASH_OBJECT => {

        return {
            following: state.following,
            profile: state.profile,
            playlist: action.payload.playlist,
            recommendations: state.recommendations
        };
    },

    [RECOMMENDATIONS_ACTION]: (state: DASH_OBJECT, action: Action<DASH_OBJECT>): DASH_OBJECT => {

        return {
            following: state.following,
            profile: state.profile,
            playlist: state.playlist,
            recommendations: action.payload.recommendations
        };
    }


}, {});


export default dashboard;

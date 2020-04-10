import { AJAX } from "../shared/ajax";

export const dashboardThunk = (dispatch: any, getStore: any) => {
    dispatch({ type: "WHATEVER" });
    const { playlists, songs, token, tab } = getStore();
    const reduxStorage = JSON.parse(localStorage.getItem("my-save-key") as string);
    const LStoken = reduxStorage ? reduxStorage.token : "" || token;
    const LStab = reduxStorage ? reduxStorage.tab : "";
    const gotToken = (token || LStoken) !== "";
    const reduxSongsExist = reduxStorage ? reduxStorage.songs.data.length !== 0 : false;
    const reduxPlaylistsExist = reduxStorage ? reduxStorage.playlists.data.length !== 0 : false;
    console.log("TOKEN IS :", token);
    console.log("LOCALSTORAGE TOKEN IS :", LStoken);
    console.log("GOT TOKEN IS :", gotToken);
    console.log("STORE TAB IS :", tab);
    console.log("LOCALSTORAGE TAB IS :", LStab);
    console.log("SONGS LOADING :", songs.loading);
    console.log("LOCALSTORAGE SONGS exist :", reduxSongsExist);
    if (gotToken) {
        // if (songs.loading && !reduxSongsExist) {
            console.info("firing songs request");
            AJAX("/songs", token || LStoken)
                .map((user) => {
                    dispatch({ type: "SET_SONGS", payload: user.response });
                    dispatch({ type: "SET_SONG_LOADING_FILTER", payload: false })
                }).take(1).subscribe()
        // }
        // if (playlists.loading && !reduxPlaylistsExist) {
            console.info("firing playlists request");
            AJAX("/playlists", token || LStoken)
                .map((user) => {
                    dispatch({ type: "SET_PLAYLISTS", payload: user.response });
                    dispatch({ type: "SET_PLAYLISTS_LOADING_FILTER", payload: false })
                }).take(1).subscribe()
        // }
    }
    if (tab !== LStab) {
        dispatch({ type: "SET_TAB", payload: tab })
    }
};

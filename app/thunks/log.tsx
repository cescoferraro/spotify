export const NAVIGATOR = ({ store, log = true }) => {
    const { playlists, songs, token, tab, location } = store
    const reduxStorage = JSON.parse(localStorage.getItem("spotify"))
    const LStoken = reduxStorage ? reduxStorage.token ? reduxStorage.token : "" : ""
    const LStab = reduxStorage ? reduxStorage.tab ? reduxStorage.tab : "" : ""
    const gotToken = (token || LStoken) !== ""
    const reduxSongsExist = reduxStorage ? reduxStorage.songs ? true : false : false
    const reduxPlaylistsExist = reduxStorage ? reduxStorage.playlists ? true : false : false
    const reduxStorageExist = reduxStorage ? reduxStorage.storage ? true : false : false
    if (log) {
        console.log("====================================================================================")
        console.log("THUNK")
        console.log("====================================================================================")
        /* console.log("REDUX:")*/
        /* console.log(store)*/
        /* console.log("LOCASLSTORAGE :")*/
        /* console.log(reduxStorage)*/
        console.log("REDUX TOKEN IS :", token.substring(0, 20))
        console.log("LOCALSTORAGE TOKEN IS :", LStoken.substring(0, 20))
        console.log("GOT TOKEN IS :", gotToken)
        console.log("REDUX TAB IS :", tab)
        console.log("LOCALSTORAGE TAB IS :", LStab)
        console.log("REDUX SONGS LOADING :", songs.loading)
        console.log("LOCALSTORAGE SONGS exist :", reduxSongsExist)
        console.log("LOCALSTORAGE STORAGE exist :", reduxStorageExist)
        console.log("====================================================================================")
    }
    return ({
        reduxStorage,
        LStoken,
        LStab,
        gotToken,
        reduxSongsExist,
        reduxPlaylistsExist
    })
}

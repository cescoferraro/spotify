export const NAVIGATOR = ({ store, log = true }) => {
    const { playlists, songs, token, tab, location } = store
    const reduxStorage = JSON.parse(localStorage.getItem("spotify"))
    const LStoken = reduxStorage ? reduxStorage.token : "" || token
    const LStab = reduxStorage ? reduxStorage.tab : ""
    const gotToken = (token || LStoken) !== ""
    const reduxSongsExist = reduxStorage ? reduxStorage.songs ? true : false : false
    const reduxPlaylistsExist = reduxStorage ? reduxStorage.playlists ? true : false : false
    const reduxStorageExist = reduxStorage ? reduxStorage.storage ? true : false : false
    if (log) {
        console.log("==========================================")
        console.log("THUNK")
        console.log("==========================================")
        console.log("REDUX:", store)
        console.log("LOCASLSTORAGE :", reduxStorage)
        console.log("REDUX TOKEN IS :", token)
        console.log("LOCALSTORAGE TOKEN IS :", LStoken)
        console.log("GOT TOKEN IS :", gotToken)
        console.log("REDUX TAB IS :", tab)
        console.log("LOCALSTORAGE TAB IS :", LStab)
        console.log("REDUX SONGS LOADING :", songs.loading)
        console.log("LOCALSTORAGE SONGS exist :", reduxSongsExist)
        console.log("LOCALSTORAGE STORAGE exist :", reduxStorageExist)
        console.log("LOCALSTORAGE STORAGE :", reduxStorageExist ? reduxStorage.storage : null)
        console.log("REDUX LOCATION:", location)
        console.log("==========================================")
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

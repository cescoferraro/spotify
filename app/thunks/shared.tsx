export const isArtistState = (state) => {
    return state.indexOf("@") > -1 ? true : false
}

export const homeThunk = (dispatch, getState) => {
    if (getState().location.kind === "push") {
        console.log("killed the LOCALSTORAGE")
        localStorage.removeItem("spotify")
    }
}
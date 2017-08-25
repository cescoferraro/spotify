export const homeThunk = (dispatch, getState) => {
    dispatch({ type: "SET_TOKEN", payload: "" })
    dispatch({ type: "SET_NOW", payload: {} })
}

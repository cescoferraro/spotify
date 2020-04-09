import { isServer } from "../../store/createStore";

export const homeThunk = (dispatch: any, getState: any) => {
    console.log("state at home thunk", getState());
    // if (getState().location.kind === "push") {
    //     console.log("killed the LOCALSTORAGE");
    //     localStorage.removeItem("my-save-key")
    // }
};

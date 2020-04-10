import "rxjs/add/observable/dom/ajax"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import {Observable} from "rxjs/Observable"
import {bodyUrl} from "../shared/ajax"
import {API_URL} from "../shared/api"
import {AT} from "./shared"

export const authThunk = (dispatch: any, getState: any) => {
  const {token, state} = getState().location.payload;
  Observable.ajax(bodyUrl(API_URL() + "/me", token))
    .take(1)
    .map((user) => {
      dispatch({type: "SET_TOKEN", payload: token});
      dispatch({type: "SET_USER", payload: user.response});
      dispatch({type: "SET_TAB", payload: "player"});
      return user
    })
    .map((user) => {
      if (AT(state)) {
        dispatch(({
          type: "ARTIST",
          payload: {
            token,
            state,
            user: user.response
          }
        }));
        return
      } else {
        dispatch(({
          type: state.toUpperCase(),
          payload: {tab: "player"}
        }));
        return
      }

    }).subscribe()
};

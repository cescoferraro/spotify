import Button from "material-ui/RaisedButton"
import * as React from "react";
import {useEffect, useState} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {AjaxResponse} from "rxjs/ajax";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/dom/ajax';
import {NowListening} from "../reactappenv";
import {AJAX} from "../app/shared/ajax";
import {Auth} from "./auth_store";

const getSelector = (history: any) => {
  return (e: any, obs: any) => {
    console.log(e);
    history.push("/");
    return Observable.empty();
  };
};

interface IDashboardComponentState {
  listening: boolean
  now: NowListening.Root | null
}

const fetchDashboardState = ({auth, setState, state, history}: any) => () => {
  if (auth.token != "initial") {
    AJAX("/now", auth.token)
      .catch(getSelector(history))
      .subscribe((e: AjaxResponse) => {
        const response = e.response as NowListening.Root;
        setState({...state, now: response as any, listening: !!response});
        console.log(e.response);
      });
  } else {
    history.push("/")
  }
  console.info(auth);
};

export const DashboardComponent = withRouter((
  {auth, history}: RouteComponentProps<{}> & { auth: Auth }) => {
  let initialState: IDashboardComponentState = {listening: false, now: null};
  const [state, setState] = useState(initialState);
  useEffect(fetchDashboardState({auth, history, state, setState}), [auth.token]);
  return (
    <div onClick={() => fetchDashboardState({auth, history, state, setState})()}>
      {state.listening && (
        <div>
          {state.now?.Item.name}
          listeninig
          <Button
            onClick={() => {
              AJAX("/pause", auth.token)
                .catch(getSelector(history))
                .subscribe((e: AjaxResponse) => {
                  console.log(e.response);
                });
            }}
          >
            Stop
          </Button>
        </div>
      )}
      {!state.listening && <h2>not listeninig</h2>}
    </div>
  );
});

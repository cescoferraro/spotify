import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {BoilTheme} from "./new";
import './index.css';
import {AppRouter} from "./new/router";
import * as serviceWorker from './serviceWorker';

const boilMUI = getMuiTheme(BoilTheme, {userAgent: navigator.userAgent});
ReactDOM.render(
  <MuiThemeProvider muiTheme={boilMUI}>
    <AppContainer>
      <AppRouter/>
    </AppContainer>
  </MuiThemeProvider>
  , document.getElementById("root"));

serviceWorker.unregister();

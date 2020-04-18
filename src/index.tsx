import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import './index.css';
import {BoilTheme} from "./new";
import {App} from "./new/app";
import * as serviceWorker from './serviceWorker';
import "react-jinke-music-player/assets/index.css";

const boilMUI = getMuiTheme(BoilTheme, {userAgent: navigator.userAgent});
ReactDOM.render(
    <MuiThemeProvider muiTheme={boilMUI}>
      <AppContainer>
        <App/>
      </AppContainer>
    </MuiThemeProvider>
  , document.getElementById("root"));

serviceWorker.register();

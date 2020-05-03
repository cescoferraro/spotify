import React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import "react-jinke-music-player/assets/index.css";
import {App} from "./app";
import './index.css';
import 'mobx-react-lite/batchingForReactDom'
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <AppContainer>
    <App/>
  </AppContainer>
), document.getElementById("root"));

serviceWorker.register();

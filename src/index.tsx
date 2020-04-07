import React from "react";
import {AppRouter} from "./app/router";
import './index.css';
import {Renderer} from "./renderer";
import * as serviceWorker from './serviceWorker';

Renderer(AppRouter);

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import {AppRouter} from "./router";
import './index.css';
import {Renderer} from "./renderer";
import * as serviceWorker from './serviceWorker';

Renderer(AppRouter);

serviceWorker.unregister();

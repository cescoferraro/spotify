import { combineEpics } from "redux-observable"
import {
    playEpic, stopEpic,
    previousEpic, nextEpic, nowEpic, logoutEpic
} from "./epics/index";

export const RootEpic = combineEpics(
    playEpic,
    stopEpic,
    previousEpic,
    nowEpic,
    logoutEpic,
    nextEpic
)

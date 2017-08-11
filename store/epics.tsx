import { combineEpics } from "redux-observable"
import {
    loginEpic, pingEpic, playEpic,
    stopEpic, previousEpic, nextEpic
} from "./epics/index";

export const RootEpic = combineEpics(
    loginEpic,
    playEpic,
    stopEpic,
    previousEpic,
    nextEpic,
    pingEpic
)

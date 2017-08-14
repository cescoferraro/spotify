import { combineEpics } from "redux-observable"
import {
    playEpic, stopEpic,
    previousEpic, nextEpic, nowEpic
} from "./epics/index";

export const RootEpic = combineEpics(
    playEpic,
    stopEpic,
    previousEpic,
    nowEpic,
    nextEpic
)

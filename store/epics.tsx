import { combineEpics } from "redux-observable"
import { loginEpic, pingEpic } from "./epics/index";

export const RootEpic = combineEpics(
    loginEpic,
    pingEpic
)

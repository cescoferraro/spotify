import { combineEpics } from "redux-observable"
import { playEpic, playSongEpic, playPlaylistEpic } from "./epics/play";
import { stopEpic } from "./epics/stop";
import { previousEpic } from "./epics/previous";
import { nowEpic } from "./epics/now";
import { logoutEpic } from "./epics/logout";
import { repeatEpic } from "./epics/repeat";
import { volumeEpic } from "./epics/index";
import { nextEpic } from "./epics/next";

export const RootEpic = combineEpics(
    playEpic,
    stopEpic,
    previousEpic,
    nowEpic,
    playSongEpic,
    logoutEpic,
    repeatEpic,
    volumeEpic,
    playPlaylistEpic,
    nextEpic
)

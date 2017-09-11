import { combineEpics } from "redux-observable"
import { playEpic } from "./epics/play"
import { stopEpic } from "./epics/stop"
import { previousEpic } from "./epics/previous"
import { playerEpic } from "./epics/now"
import { logoutEpic } from "./epics/logout"
import { repeatEpic } from "./epics/repeat"
import { volumeEpic } from "./epics/index"
import { nextEpic } from "./epics/next"
import { playPlaylistEpic } from "./epics/playlist"
import { labelTopEpic } from "./epics/labelTop"
import { playSongEpic } from "./epics/play_song"

export const RootEpic = combineEpics(
    playEpic,
    stopEpic,
    previousEpic,
    playerEpic,
    playSongEpic,
    logoutEpic,
    repeatEpic,
    volumeEpic,
    playPlaylistEpic,
    labelTopEpic,
    nextEpic
)

import * as storage from "redux-storage"
import createEngine from "redux-storage-engine-localstorage"
import debounce from "redux-storage-decorator-debounce"
import filter from "redux-storage-decorator-filter"
import { createLogger } from "redux-logger"
import { routesMap } from "../app/route.map"
import { createEpicMiddleware } from "redux-observable"
import { RootEpic } from "./epics"
import { isServer } from "../shared/utils"


export const epicsMiddleware = createEpicMiddleware(RootEpic)

export const loggerMiddleware = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    predicate: (getState, action) => {
        return !isServer()
    }
})

export let engine = createEngine("spotify")
engine = debounce(engine, 2000)
engine = filter(
    engine,
    ["storage", "songs", "player", "token", "drawer", "tab", "user", "playlists", "id"],
    ["location"]
)
export const storageMiddleware = storage.createMiddleware(engine, Object.keys(routesMap))

import { connectRoutes } from "redux-first-router"
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { appReducers } from "./reducers"
import { routesMap } from "../app/route.map"
import * as storage from "redux-storage"
import { epicsMiddleware, storageMiddleware, loggerMiddleware } from "./middlewares";

export const configureStore = (history) => {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap)
    const appMiddlewares = [middleware, storageMiddleware, loggerMiddleware, epicsMiddleware]
    const SpotifyMiddlewares = composeWithDevTools(applyMiddleware(...appMiddlewares))
    const SpotifyReducers = storage.reducer(appReducers(reducer))
    const store = createStore(SpotifyReducers, compose(enhancer, SpotifyMiddlewares))
    if (module.hot) {
        module.hot.accept(["./reducers.tsx"], () => {
            store.replaceReducer(require("./reducers.tsx").appReducers(reducer))
        })
        module.hot.accept(["./epics.tsx"], () => {
            epicsMiddleware.replaceEpic(require("./epics.tsx").RootEpic)
        })
    }
    return store
}

import {applyMiddleware, compose, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {createLogger} from "redux-logger"
import {createEpicMiddleware} from "redux-observable"
import * as storage from "redux-storage"
import debounce from "redux-storage-decorator-debounce"
import filter from 'redux-storage-decorator-filter'
import createEngine from "redux-storage-engine-localstorage"
import {RootEpic} from "./epics";
import {allReducers} from "./reducers"

export let engine = createEngine("my-save-key");
engine = debounce(engine, 2000);
engine = filter(engine, ["storage", "songs", "player", "token", "drawer", "tab", "user", "playlists"], ["location"]);

const ReplacebleEpicMiddleware = createEpicMiddleware();

export const isServer = () => !(typeof window !== "undefined" && window.document);

export const configureStore = (history: any = {}) => {
    // const {reducer, middleware, enhancer} = connectRoutes(routesMap as any, {basename: "/spotify"});
    // const appReducers = allReducers(reducer);
    let reducers = allReducers(null);
    const reducerXXX = storage.reducer(reducers);
    const middlewareXXX = storage.createMiddleware(engine);
    const middlewares = composeWithDevTools(
        applyMiddleware(
            // middleware,
            // middlewareXXX,
            createLogger({
                predicate: (getState, action) => {
                    return !isServer()
                }
            }),
            ReplacebleEpicMiddleware
        )
    );
    const createStoreWithMiddleware = applyMiddleware(middlewareXXX)(createStore);
    const store = createStoreWithMiddleware(reducerXXX, compose(middlewares) as any);

    // const {reducer, middleware, enhancer} = connectRoutes(routesMap as any)
    //
    // const middlewares = applyMiddleware(middleware,ReplacebleEpicMiddleware)
    // const enhancers = compose(enhancer, middlewares)
    //
    // const store = createStore(allReducers(reducer), enhancers)
    ReplacebleEpicMiddleware.run(RootEpic);
    // const store = createStore(appReducers, compose(enhancer, middlewares));
    // if (module.hot) {
    //     module.hot.accept(["./reducers.tsx"], () => {
    //         const nextRootReducer = require("./reducers.tsx").allReducers(reducers);
    //         store.replaceReducer(nextRootReducer)
    //     });
    //     module.hot.accept(["./epics.tsx"], () => {
    //         const nextRootEpic = require("./epics.tsx").RootEpic;
    //         ReplacebleEpicMiddleware.run(nextRootEpic)
    //     })
    // }
    return store
};

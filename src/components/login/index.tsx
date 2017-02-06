import {createAsyncComponent} from "react-async-component";
import * as React from "react";
import {Spinner} from "../spinner/index";

export const AsyncLogin = userAgent => createAsyncComponent({
    resolve: () => new Promise(resolve =>
        require.ensure([], (require) => {
            resolve(require("./login"));
        })),
    Loading: (prop) => <Spinner userAgent={userAgent}/>
});

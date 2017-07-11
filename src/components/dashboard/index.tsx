import { createAsyncComponent } from "react-async-component";
import * as React from "react";
import { Spinner } from "../spinner/index";

export const AsyncDashboard = userAgent => createAsyncComponent({
    resolve: () => new Promise(resolve =>
        require.ensure([], (require) => {
            resolve(require("./dashboard"));
        }, "dashboard.js")),
    defer: true,
    Loading: (prop) => <Spinner userAgent={userAgent} />
});

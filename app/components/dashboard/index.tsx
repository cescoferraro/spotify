import universal from "react-universal-component"
declare var System: any
import * as importCss from "babel-plugin-universal-import/importCss.js"
import * as universalImport from "babel-plugin-universal-import/universalImport.js"

export const AsyncDashboard = universal(
    universalImport({
        load: () => Promise.all([
            System.import(/* webpackChunkName: 'dashboard' */ "./dashboard"),
            importCss("main")]).then((promises) => promises[0]),
        chunkName: () => "dashboard",
        resolve: () => require.resolveWeak("./dashboard")
    })
)

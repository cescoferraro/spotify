import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/filter"


export const pingEpic = (action$) =>
    action$.filter((action) => action.type === "PING")
        .map((hey) => (hey))
        .mapTo({ type: "USER", payload: 78878 })

export const loginEpic = (action$) =>
    action$.filter((action) => action.type === "LOGIN")
        .map((hey) => (hey))
        .mapTo({ type: "DASHBOARD" })

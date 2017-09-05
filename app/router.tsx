import * as React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import { NoMatchContainer } from "./components/404/404"
import { Shell } from "./components/shell/index"
import { AsyncDashboard } from "./components/dashboard"
import { Artist } from "./components/artist/artist"
import { HomeComponent } from "./components/home/home"
import { bindActionCreators } from "redux"
export const DISPATCH = (type, payload, meta = {}) => ({ type, payload, meta })
export const APP_ACTIONS = (dispatch) => bindActionCreators({ DISPATCH }, dispatch)

export const AppRouter = compose(
    connect((state) => ({ ...state }), APP_ACTIONS)
)((props) => {
    switch (props.location.type) {
        case "HOME":
            return (
                <Shell title="Home" {...props}>
                    <HomeComponent  {...props} />
                </Shell>
            )
        case "AUTH":
        case "DASHBOARD":
        case "DASHBOARD_DETAIL":
            return (
                <Shell title="Dashboard" {...props}>
                    <AsyncDashboard {...props} />
                </Shell>
            )
        case "ARTIST":
            return (
                <Shell title="Dashboard" {...props}>
                    <Artist {...props} />
                </Shell>
            )
        default:
            return (
                <Shell title="404" {...props}>
                    <NoMatchContainer {...props} />
                </Shell>
            )
    }
})

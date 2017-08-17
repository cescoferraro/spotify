import * as React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import { NoMatchContainer } from "./components/404/404"
import { Shell } from "./components/shell/index"
import { MyHelmet } from "../shared/helmet/index"
import { AsyncDashboard } from "./components/dashboard"
import { Artist } from "./components/artist/artist"
import { HomeComponent } from "./components/home"
import { APP_ACTIONS } from "../store/actions";

const AppRouterClass = (props) => {
    switch (props.location.type) {
        case "HOME":
            return (
                <Shell id="Home" {...props}>
                    <HomeComponent  {...props} />
                </Shell>
            )
        case "DASHBOARD":
        case "AUTH":
            return (
                <Shell id="Dashboard" {...props}>
                    <AsyncDashboard {...props} />
                </Shell>
            )
        case "ARTIST":
            return (
                <Shell id="Dashboard" {...props}>
                    <Artist {...props} />
                </Shell>
            )
        default:
            return (
                <Shell id="404" {...props}>
                    <NoMatchContainer {...props} />
                </Shell>
            )
    }

}

export const AppRouter = compose(
    connect(({ location, drawer, token, player, artist }) =>
        ({ location, drawer, token, player, artist }), APP_ACTIONS)
)(AppRouterClass)

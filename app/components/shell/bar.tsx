import * as React from "react"
import AppBar from "material-ui/AppBar"
import * as CSS from "./shell.css"
const SPOTIFYLogo = require("../../../shared/images/spotify.svg")
import DashboardIcon from "material-ui/svg-icons/navigation/cancel"

const goBack = (props) => () => {
    props.ROUTER_ACTION("HOME")
    props.DRAWER_ACTION(false)
}

const boilLogo = (props) => {
    return props.location.type === "DASHBOARD" || props.location.type === "ARTIST" &&
        props.location.payload.user ?
        <DashboardIcon
            onClick={() => {
                props.dispatch({ type: "LOGOUT", payload: { token: props.token } })
            }}
            className={CSS.button}
        /> :
        null
}

export const SPOTIFYAppBar = (props) => {
    console.log("came back")
    return (
        <AppBar
            showMenuIconButton={true}
            onTitleTouchTap={goBack(props)}
            iconElementRight={boilLogo(props)}
            iconElementLeft={<SPOTIFYLogo className={CSS.button} />}
            titleStyle={{ color: "black" }}
        />
    )
}

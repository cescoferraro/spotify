import * as React from "react"
import AppBar from "material-ui/AppBar"
import * as CSS from "./shell.css"
const SPOTIFYLogo = require("../../../shared/images/spotify.svg")

const goBack = (props) => () => {
    props.ROUTER_ACTION("HOME")
    props.DRAWER_ACTION(false)
}

const boilLogo = (props) => {
    return props.location.type === "DASHBOARD" &&
        props.location.payload.user ?
        <SPOTIFYLogo
            onClick={() => {
                props.dispatch({ type: "LOGOUT", payload: { token: props.token } })
            }}
            className={CSS.button}
        /> :
        null
}

export const SPOTIFYAppBar = (props) => {
    console.log("came back")
    console.log(props)
    return (
        <AppBar
            showMenuIconButton={false}
            onTitleTouchTap={goBack(props)}
            iconElementRight={boilLogo(props)}
            title="Spotify"
            titleStyle={{ color: "black" }}
        />
    )
}

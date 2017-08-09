import * as React from "react"
import AppBar from "material-ui/AppBar"
import * as CSS from "../css/shell.css"
const SPOTIFYLogo = require("../../../../shared/images/spotify.svg")

const goBack = (props) => () => {
    props.GO_HOME_ACTION("HOME")
    props.DRAWER_ACTION(false)
}

const boilLogo = (props) => {
    return props.location.type === "DASHBOARD" &&
        props.location.payload.user ?
        <SPOTIFYLogo
            onClick={props.DRAWER_TOGGLE_ACTION}
            className={CSS.button}
        /> :
        null
}
export const SPOTIFYAppBar = (props) => {
    return (
        <AppBar
            showMenuIconButton={false}
            onTitleTouchTap={goBack(props)}
            iconElementRight={boilLogo(props)}
            title="Spotify"
        />
    )
}

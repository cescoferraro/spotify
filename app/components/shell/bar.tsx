import * as React from "react"
import AppBar from "material-ui/AppBar"
import * as CSS from "./shell.css"
const SPOTIFYLogo = require("../../../shared/images/spotify.svg")
import DashboardIcon from "material-ui/svg-icons/navigation/cancel"

const goBack = (props) => () => {
    props.DISPATCH("HOME", { format: true })
}

const boilLogo = (props) => {
    const goAway = () => {
        props.DISPATCH("LOGOUT", { token: props.token })
        props.DISPATCH("HOME", { format: true })
    }
    return props.location.type !== "HOME" &&
        props.user ?
        (<DashboardIcon onClick={goAway} className={CSS.button} />) : null
}

export const SPOTIFYAppBar = (props) => {
    return (
        <AppBar
            showMenuIconButton={true}
            onTitleTouchTap={goBack(props)}
            title="Spotify "
            iconElementRight={boilLogo(props)}
            iconElementLeft={<SPOTIFYLogo className={CSS.button} />}
            titleStyle={{ color: "black" }}
        />
    )
}

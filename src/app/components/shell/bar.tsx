import AppBar from "material-ui/AppBar"
import DashboardIcon from "material-ui/svg-icons/navigation/cancel"
import * as React from "react"
import * as CSS from "./shell.css"

const SPOTIFYLogo = require("../../../shared/images/spotify.svg");

const goBack = (props: any) => () => {
    props.DISPATCH("HOME", {format: true})
};

const boilLogo = (props: any) => {
    const goAway = () => {
        props.DISPATCH("LOGOUT", {token: props.token});
        props.DISPATCH("HOME", {format: true})
    };
    return props.location.type !== "HOME" &&
    props.user ?
        (<DashboardIcon onClick={goAway} className={CSS.button}/>) :
        (<DashboardIcon onClick={goAway} className={CSS.button}/>)
};

export const SPOTIFYAppBar = (props: any) => {
    return (
        <AppBar
            showMenuIconButton={true}
            // onTitleTouchTap={goBack(props)}
            title="Spotify "
            iconElementRight={boilLogo(props)}
            iconElementLeft={<SPOTIFYLogo className={CSS.button}/>}
            titleStyle={{color: "black"}}
        />
    )
};

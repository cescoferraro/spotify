import * as React from "react"
import ReduxToastr from "react-redux-toastr"
import Subheader from "material-ui/Subheader"
import * as cs from "classnames"
import AppBar from "material-ui/AppBar"
import * as CSS from "./shell.css"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
const Cancel = require("../../../shared/images/cancel.svg")
const Boy = require("../../../shared/images/boy.svg")
const Girl = require("../../../shared/images/girl.svg")
const BoilLogo = require("../../../shared/images/spotify.svg")

const goBack = (props) => () => {
    props.ROUTER_ACTION("HOME")
    props.DRAWER_ACTION(false)
}
const goUser = (props, id) => () => {
    props.ROUTER_ACTION(id)
    props.DRAWER_ACTION(false)
}

const closeOnClick = (props) => (open) => { props.DRAWER_ACTION(open) }

export const SPOTIFYDrawer = (props) => {
    return (
        <Drawer
            onRequestChange={closeOnClick(props)}
            docked={false}
            open={props.drawer}
        >
            <div className={cs(CSS.flex, CSS.main)}>
                <BoilLogo
                    onClick={goBack(props)}
                    className={cs(CSS.svg)}
                />
            </div>
            <Subheader>spotify</Subheader>
            <MenuItem
                leftIcon={<Boy className={CSS.button} />}
                onClick={goBack(props)}
            >
                User 123
            </MenuItem>
        </Drawer>
    )
}

import * as React from "react"
import Subheader from "material-ui/Subheader"
import * as cs from "classnames"
import * as CSS from "./shell.css"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
const Boy = require("../../../shared/images/boy.svg")
const BoilLogo = require("../../../shared/images/spotify.svg")

const goBack = (props) => () => {
    props.DISPATCH("HOME", {})
    props.DISPATCH("DRAWER_ACTION", false)
}

const closeOnClick = (props) => (open) => { props.DISPATCH("DRAWER_ACTION", open) }

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

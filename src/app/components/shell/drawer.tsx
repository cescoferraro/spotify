import * as cs from "classnames"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
import Subheader from "material-ui/Subheader"
import * as React from "react"
import * as CSS from "./shell.css"

// const Boy = require("../../../shared/images/boy.svg");
// const BoilLogo = require("../../../shared/images/spotify.svg");

const goBack = (props: any) => () => {
    props.ROUTER_ACTION("HOME");
    props.DRAWER_ACTION(false)
};

const closeOnClick = (props: any) => (open: any) => {
    props.DRAWER_ACTION(open)
};

export const SPOTIFYDrawer = (props: any) => {
    return (
        <Drawer
            onRequestChange={closeOnClick(props)}
            docked={false}
            open={props.drawer}
        >
            <div className={cs.default(CSS.flex, CSS.main)}>
                {/*<BoilLogo*/}
                {/*    onClick={goBack(props)}*/}
                {/*    className={cs.default(CSS.svg)}*/}
                {/*/>*/}
            </div>
            <Subheader>spotify</Subheader>
            <MenuItem
                // leftIcon={<Boy className={CSS.button}/>}
                onClick={goBack(props)}
            >
                User 123
            </MenuItem>
        </Drawer>
    )
};

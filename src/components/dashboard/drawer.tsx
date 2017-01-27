import * as  React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {APP_OBJECT} from "../../reducers/app";
import {connect} from "react-redux";

type StateProps = {
    app: APP_OBJECT,
    TOOGLE_SIDE_BAR()
}


export default class DrawerUndockedExample2 extends React.Component<StateProps, any> {

    render() {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.props.app.sidebar}
                onRequestChange={this.props.TOOGLE_SIDE_BAR}
            >
                <MenuItem >Menu Item</MenuItem>
                <MenuItem >Menu Item 2</MenuItem>
            </Drawer>
        )
    };
}

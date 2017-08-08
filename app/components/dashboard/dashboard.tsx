import * as React from "react"
import * as CSS from "./css/teste.css"
import { Card } from "material-ui/Card"
import Subheader from "material-ui/Subheader"
import { ProfileClass } from "../../../store/reducers"
import Code from "material-ui/svg-icons/action/code"
import Terrain from "material-ui/svg-icons/maps/terrain"
import LocationCity from "material-ui/svg-icons/social/location-city"
import AccountCircle from "material-ui/svg-icons/action/account-circle"
import GpsFixed from "material-ui/svg-icons/device/gps-fixed"
import Divider from "material-ui/Divider"
import { compose } from "recompose"
import sizeMe from "react-sizeme"

export class DashboardComponent extends React.Component<any, any> {
    public render() {
        const { payload } = this.props.location
        return payload.code ?
            <div className={CSS.test} >
                <h2>authenticating</h2>
            </div> :
            payload.user ?
                <div className={CSS.test} >
                    <h2>{payload.user.display_name}</h2>
                    <h2>{payload.user.email}</h2>
                    <h2>{payload.user.href}</h2>
                </div> :
                <div className={CSS.test} >
                    <h2>no dashboard</h2>
                </div>
    }
}

export default compose()(DashboardComponent)

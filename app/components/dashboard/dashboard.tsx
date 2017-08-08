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

export class UserComponent extends React.Component<any, any> {
    public render() {
        const profile: ProfileClass = new ProfileClass(this.props.profiles[this.props.profile.id])
        const grey = { fill: "grey" }
        console.log(this.props.location)
        return (
            <div className={CSS.test}>
                <h2>Dashboard</h2>
                <h2>
                    {this.props.location.payload.code ? "temos id" : "não temos id"}
                </h2>
            </div>
        )
    }
}

export default compose()(UserComponent)

import * as React from "react"
import { API_URL } from "../../../shared/api"
import RaisedButton from "material-ui/RaisedButton"
import * as CSS from "./main.css"
import * as cs from "classnames"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import { Chooser } from "./chooser"

export const HomeComponent = (props) => {
    const login = () => {
        window.location.href = API_URL() + "/login"
    }
    return (
        <div className={cs(CSS.container)} >
            <div className={CSS.dashboard}>
                <RaisedButton
                    onClick={login}
                    icon={<DashboardIcon />}
                    labelStyle={{ fontSize: "100%" }}
                    secondary={true}
                    fullWidth={true}
                    label="Dashboard"
                />
            </div>
            <Chooser />
        </div >
    )
}

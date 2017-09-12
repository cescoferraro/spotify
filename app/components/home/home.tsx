import * as React from "react"
import { API_URL } from "../../../shared/api"
import RaisedButton from "material-ui/RaisedButton"
import * as CSS from "./main.css"
import * as cs from "classnames"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import { Chooser } from "./chooser"
import { OfflineToast } from "../../../shared/toastr"

const login = () => {
    const url = API_URL() + "/app/login"
    const { Offline } = (window as any)
    if (Offline.state === "up") {
        window.location.href = url
    } else {
        OfflineToast()
    }
}

export const HomeComponent = (props) => {
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

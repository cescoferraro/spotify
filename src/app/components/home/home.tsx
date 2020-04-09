import * as cs from "classnames"
import RaisedButton from "material-ui/RaisedButton"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import * as React from "react"
import {API_URL} from "../../../shared/api"
import {Chooser} from "./chooser"
import * as CSS from "./main.css"

export const HomeComponent = (props: any) => {
    const login = () => {
        const url = API_URL() + "/login";
        const {Offline} = (window as any);
        // if (Offline.state === "up") {
            window.location.href = url
        // } else {
        //     OfflineToast()
        // }
    };
    return (
        <div className={cs.default(CSS.container)}>
            <div className={CSS.dashboard}>
                <RaisedButton
                    onClick={login}
                    icon={<DashboardIcon/>}
                    labelStyle={{fontSize: "100%"}}
                    secondary={true}
                    fullWidth={true}
                    label="Dashboard"
                />
            </div>
            <Chooser/>
        </div>
    )
};

import * as React from "react"
import { API_URL } from "../../../shared/api"
import RaisedButton from 'material-ui/RaisedButton'
const SPOTIFYIcon = require("../../../shared/images/spotify.svg")
import * as CSS from "./home.css"
import * as cs from "classnames"
import IconButton from 'material-ui/IconButton';
import RemoveIcon from "material-ui/svg-icons/content/remove"
import AddIcon from "material-ui/svg-icons/content/add"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"

const fanBoyGen = (id, move) => () => {
    window.location.href = API_URL() + "/artist/" + move + "/" + id
}

const login = () => {
    window.location.href = API_URL() + "/login"
}

const PlusIcon = () => {
    return <AddIcon className={CSS.hateButton} />
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
                    label="Spotify Dashboard" />
            </div>
            <div className={CSS.dashboard}>
                <RaisedButton
                    onClick={() => {
                        props.LABEL_TOP_ARTISTS_ACTION("sony")
                    }}
                    icon={<DashboardIcon />}
                    labelStyle={{ fontSize: "100%" }}
                    secondary={true}
                    fullWidth={true}
                    label="LABEL TOP ARTISTS" />
            </div>
            <div className={CSS.hate}>
                <RaisedButton
                    onClick={fanBoyGen("7FNnA9vBm6EKceENgCGRMb", "love")}
                    labelStyle={{ fontSize: "100%" }}
                    className={CSS.button}
                    secondary={true}
                    label="💓 Anitta" />
                <RaisedButton
                    onClick={fanBoyGen("3ge4xOaKvWfhRwgx0Rldov", "love")}
                    className={CSS.button}
                    labelStyle={{ fontSize: "100%" }}
                    secondary={true}
                    label="💓 Guimé" />

                <RaisedButton
                    onClick={fanBoyGen("7FNnA9vBm6EKceENgCGRMb", "hate")}
                    className={CSS.button}
                    labelStyle={{ fontSize: "100%" }}
                    secondary={true}
                    label="🎯 Anitta" />
                <RaisedButton
                    onClick={fanBoyGen("3ge4xOaKvWfhRwgx0Rldov", "hate")}
                    labelStyle={{ fontSize: "100%" }}
                    className={CSS.button}
                    secondary={true}
                    label="🎯 Guimé" />
            </div>
        </div >
    )
}

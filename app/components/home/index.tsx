import * as React from "react"
import { API_URL } from "../../../shared/api"
import RaisedButton from 'material-ui/RaisedButton'
const SPOTIFYIcon = require("../../../shared/images/spotify.svg")
import * as CSS from "./home.css"
import * as cs from "classnames"
import IconButton from 'material-ui/IconButton';
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import AddIcon from "material-ui/svg-icons/content/add"
import RemoveIcon from "material-ui/svg-icons/content/remove"

const fanBoyGen = (id, move) => () => {
    window.location.href = API_URL() + "/login/" + id + "/" + move
}

const login = () => {
    window.location.href = API_URL() + "/login"
}

export const HomeComponent = (props) => {
    return (
        <div className={cs(CSS.container)} >
            <div className={CSS.dashboard}>
                <RaisedButton
                    onClick={login}
                    icon={<DashboardIcon />}
                    secondary={true}
                    fullWidth={true}
                    label="Spotify Profile " />
            </div>
            <div className={CSS.hate}>
                <RaisedButton
                    onClick={fanBoyGen("7FNnA9vBm6EKceENgCGRMb", "love")}
                    labelStyle={{ height: "10vh" }}
                    className={CSS.button}
                    secondary={true}
                    icon={<AddIcon />}
                    label="Anitta" />
                <RaisedButton
                    onClick={fanBoyGen("1HwM5zlC5qNWhJtM00yXzG", "love")}
                    className={CSS.button}
                    secondary={true}
                    icon={<AddIcon />}
                    label="DMX" />
                <RaisedButton
                    onClick={fanBoyGen("3ge4xOaKvWfhRwgx0Rldov", "love")}
                    className={CSS.button}
                    icon={<AddIcon />}
                    secondary={true}
                    label="Guimé" />
                <RaisedButton
                    onClick={fanBoyGen("3nFkdlSjzX9mRTtwJOzDYB", "love")}
                    className={CSS.button}
                    secondary={true}
                    icon={<AddIcon />}
                    label="Jay-Z" />


                <RaisedButton
                    onClick={fanBoyGen("7FNnA9vBm6EKceENgCGRMb", "hate")}
                    className={CSS.button}
                    secondary={true}
                    icon={<DashboardIcon />}
                    label="Anitta" />
                <RaisedButton
                    onClick={fanBoyGen("1HwM5zlC5qNWhJtM00yXzG", "hate")}
                    className={CSS.button}
                    secondary={true}
                    icon={<DashboardIcon />}
                    label="DMX" />
                <RaisedButton
                    onClick={fanBoyGen("3ge4xOaKvWfhRwgx0Rldov", "hate")}
                    className={CSS.button}
                    secondary={true}
                    icon={<DashboardIcon />}
                    label="Guimé" />
                <RaisedButton
                    onClick={fanBoyGen("3nFkdlSjzX9mRTtwJOzDYB", "hate")}
                    className={CSS.button}
                    secondary={true}
                    icon={<DashboardIcon />}
                    label="Jay-Z" />
            </div>
        </div >
    )
}

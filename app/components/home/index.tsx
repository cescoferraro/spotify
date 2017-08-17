import * as React from "react"
import { API_URL } from "../../../shared/api"
import RaisedButton from 'material-ui/RaisedButton'
const SPOTIFYIcon = require("../../../shared/images/spotify.svg")
import * as CSS from "./home.css"
import * as cs from "classnames"
import IconButton from 'material-ui/IconButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

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
                    secondary={true}
                    fullWidth={true}
                    label="Spotify Profile " />
            </div>
            <div className={CSS.hate}>
                <RaisedButton
                    onClick={fanBoyGen("7FNnA9vBm6EKceENgCGR", "love")}
                    secondary={true}
                    icon={<ActionAndroid />}
                    label="Love" />
                <RaisedButton
                    onClick={fanBoyGen("7FNnA9vBm6EKceENgCGR", "hate")}
                    secondary={true}
                    icon={<ActionAndroid />}
                    label="Hate" />
            </div>
        </div >
    )
}

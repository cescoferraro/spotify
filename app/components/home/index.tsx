import * as React from "react"
import { API_URL } from "../../../shared/api"
import RaisedButton from 'material-ui/RaisedButton'
const SPOTIFYIcon = require("../../../shared/images/spotify.svg")
import * as CSS from "./home.css"
import * as cs from "classnames"
import IconButton from 'material-ui/IconButton';


const login = () => {
    window.location.href = API_URL() + "/login"
}

export const HomeComponent = (props) => {
    return (
        <div className={cs(CSS.flex, CSS.container)} >
            <div>
                <div className={CSS.flex} >
                    <h2 className={CSS.whitey}
                    >Check Your Spotify Profile </h2>
                </div>
                <div className={CSS.flex} >
                    <IconButton
                        className={CSS.button}
                        onClick={login}
                    >
                        <SPOTIFYIcon className={CSS.buttonIcon} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

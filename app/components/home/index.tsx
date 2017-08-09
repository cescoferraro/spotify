import * as React from "react"
import { API_URL } from "../../../shared/api"
import RaisedButton from 'material-ui/RaisedButton'
const SPOTIFYIcon = require("../../../shared/images/spotify.svg")
import * as CSS from "./css/home.css"

import * as cs from "classnames"
export const HomeComponent = (props) => {
    const login = () => {
        window.location.href = API_URL() + "/login"
    }
    return (
        <div className={cs(CSS.container)} >
            <div className={CSS.flex} >
                <h2>Check Your Spotify Profile </h2>
            </div>
            <div className={CSS.flex} >
                <RaisedButton
                    onClick={login}
                    backgroundColor="black"
                    className={CSS.button}
                    icon={
                        <SPOTIFYIcon
                            className={CSS.buttonIcon}
                        />
                    }
                    style={{ margin: 12 }}
                />
            </div>
        </div>
    )
}

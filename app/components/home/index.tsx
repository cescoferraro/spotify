import * as React from "react"
import * as CSS from "./css/home.css"
import { isServer } from "../../../store/logger"
import { API_URL } from "../../../shared/api"


export const HomeComponent = (props) => {
    return (
        <div>
            <h2>SPOTIFY</h2>
            <button
                onClick={() => {
                    window.location.href = API_URL() + "/login"
                }}
            >
                GO

	    </button>
        </div>
    )
}

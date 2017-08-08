import * as React from "react"
import * as CSS from "./css/home.css"
import { isServer } from "../../../store/logger"

const API_URL = () => {
    if (!isServer()) {
        if (document.location.hostname === "spotify.cescoferraro.xyz") {
            return "https://apotifyapi.cescoferraro.xyz"
        }
    }
    return "http://localhost:8080"

}

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

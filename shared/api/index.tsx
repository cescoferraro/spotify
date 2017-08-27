import { isServer } from "../../store/createStore"

export const API_URL = () => {
    console.log("=======================")
    console.log(document.location)
    console.log("=======================")
    if (!isServer()) {
        if (document.location.hostname === "spotify.cescoferraro.xyz") {
            return "https://spotifyapi.cescoferraro.xyz"
        }
    }
    return document.location.protocol + "//" + document.location.hostname + ":8080"
}

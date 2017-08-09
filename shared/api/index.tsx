import { isServer } from "../../store/createStore"

export const API_URL = () => {
    if (!isServer()) {
        if (document.location.hostname === "spotify.cescoferraro.xyz") {
            return "https://spotifyapi.cescoferraro.xyz"
        }
    }
    return "http://localhost:8080"

}

import { isServer } from "../../store/logger"

export const API_URL = () => {
    if (!isServer()) {
        if (document.location.hostname === "spotify.cescoferraro.xyz") {
            return "https://apotifyapi.cescoferraro.xyz"
        }
    }
    return "http://localhost:8080"

}

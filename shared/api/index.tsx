import { isServer } from "../utils"

export const API_URL = () => {
    const { hostname, protocol } = document.location
    if (!isServer()) {
        if (hostname === "spotify.cescoferraro.xyz") {
            return "https://spotifyapi.cescoferraro.xyz"
        }
    }
    return protocol + "//" + hostname + ":8080"
}

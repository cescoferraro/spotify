import {isServer} from "../../store/createStore"

export const API_URL = () => {
    if (!isServer()) {
        if (document.location.protocol === "https:") {
            return "https://spotifyapi.cescoferraro.xyz"
        }
    }
    return document.location.protocol + "//" + document.location.hostname + ":8080"
};

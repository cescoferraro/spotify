import Utils from "../shared/utils";

let Config = {
    API_URL: () => {
        if (!Utils.isServer()) {
            if (document.location.hostname === "spotify.cescoferraro.xyz") {
                return "http://api.spotify.cescoferraro.xyz";
            }
        }
        return "http://localhost:8080";
    }
};


export default Config;




const isServer = () => !(typeof window !== 'undefined' && window.document);

let Config = {
    API_URL: () => {
        if (isServer()) {
            return "http://spotify-api.cescoferraro.xyz";
        }
        else {
            return "http://localhost:8080";
        }
    }
};


export default Config;




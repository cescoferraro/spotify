declare const ENVIRONMENT: any;

let Config = {
    API_LOCATION: () => {
        if (ENVIRONMENT === "development") {
            return "http://localhost:8080";
        }


    }
};


export default Config;




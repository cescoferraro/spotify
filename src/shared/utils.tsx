import * as React from "react";
declare const navigator: any;
import MDSpinner from "react-md-spinner";

let isServer = () => !(typeof window !== "undefined" && window.document);

let Utils = {
    isServer: isServer,
    GetCode: (nam) => {
        let name;
        if (!Utils.isServer()) {
            if (name = (new RegExp("[?&]" + encodeURIComponent(nam) + "=([^&]*)")).exec(location.search)) {
                return decodeURIComponent(name[1]);
            }
        }
        return null;
    },
    API_URL: () => {
        if (!Utils.isServer()) {
            if (document.location.hostname === "spotify.cescoferraro.xyz") {
                return "http://api.spotify.cescoferraro.xyz";
            }
        }
        return "http://localhost:8080";
    },
    asyncRoute: (getComponent) => {
        return class AsyncComponent extends React.Component<any, any> {
            static Component = null;
            mounted = false;
            counter = 1;

            state = {
                Component: AsyncComponent.Component
            };

            componentWillMount() {
                if (this.state.Component === null) {
                    getComponent().then(m => m.default).then(Component => {
                        AsyncComponent.Component = Component;
                        if (this.mounted) {
                            this.setState({Component});
                        }
                    })
                }
            }

            componentDidMount() {
                this.mounted = true;
            }

            componentWillUnmount() {
                this.mounted = false;
            }

            render() {
                let spinner = <MDSpinner userAgent={"all"}/>;
                if (isServer()) {
                    return spinner;
                }
                const {Component} = this.state;

                if (Component !== null) {
                    console.log("returning actual component ");
                    return <Component {...this.props} />;
                }
                return spinner; //with a loading spinner, etc..
            }
        }
    }
};


export default Utils;




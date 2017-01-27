import * as React from "react";

let Utils = {
    isServer: () => !(typeof window !== "undefined" && window.document),
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
                const {Component} = this.state;

                if (Component !== null) {
                    return <Component {...this.props} />;
                }
                return <div>wait</div>; //with a loading spinner, etc..
            }
        }
    }
};


export default Utils;




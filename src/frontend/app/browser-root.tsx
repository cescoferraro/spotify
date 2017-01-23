import * as React from "react";
import Router from "react-router/BrowserRouter";




interface RootProps {
    routes: Function;
}

export default class Root extends React.Component<RootProps, any> {

    constructor(props: RootProps) {
        super(props);
    }

    render() {
        return (<Router>
                {this.props.routes}
            </Router>
        );
    }
}


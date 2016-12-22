import * as React from "react";
import Router from "react-router/BrowserRouter";


interface IHelloContentProps {
    routes: Function;
}

export default class Root extends React.Component<IHelloContentProps, any> {

    constructor(props: IHelloContentProps) {
        super(props);
    }

    render() {
        return (<Router>
                {this.props.routes}
            </Router>
        );
    }
}


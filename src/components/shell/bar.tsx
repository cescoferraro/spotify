import * as React from "react";
import AppBar from "material-ui/AppBar";
import {APP_OBJECT} from "../../reducers/app";
import {connect} from "react-redux";
declare let NODE_ENV: any;
declare let require: any;

interface StateProps {
    app: APP_OBJECT
}

const mapStateToProps = (state) => ({
    app: state.app
});

@connect<StateProps,any,any>(mapStateToProps, null)
export default class Bar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <AppBar

            style={{position:"fixed",top:'0px', width:'100vw'}}
            title={"Spotify API"}
            iconElementLeft={<div></div>}
            iconElementRight={this.props.app.component}
        />;
    }

}


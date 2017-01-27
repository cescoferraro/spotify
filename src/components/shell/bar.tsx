import * as React from "react";
import AppBar from "material-ui/AppBar";
import {APP_OBJECT, SET_APP_VERSION, SET_APP_BAR_MENU} from "../../reducers/app";
import {bindActionCreators} from "redux";
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
        let title = this.props.app.version;
        return <AppBar
            style={{position:"fixed", width:'100vw'}}
            title={title}
            iconElementRight={this.props.app.component}
        />;
    }

}


import * as React from "react";
import AppBar from "material-ui/AppBar";
import { APP_OBJECT } from "../../reducers/app";
import { connect } from "react-redux";
declare let NODE_ENV: any;
declare let require: any;

let GoogleDrive = require("-!babel-loader!svg-react-loader!./logo.svg");

interface StateProps {
    app: APP_OBJECT
    css: any
}

const mapStateToProps = (state) => ({
    app: state.app
});

@connect<StateProps, any, any>(mapStateToProps, null)
export default class Bar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <AppBar

            style={{ position: "fixed", top: '0px', width: '100vw' }}
            title={"Spotify API"}
            onTitleTouchTap={(event) => {
                window.location.href = document.location.protocol + "//" + document.location.host

            } }
            iconElementLeft={<GoogleDrive className={this.props.css.teste} style={{
                height: '48px',
                fill: 'black', width: '48px'
            }} />}
            iconElementRight={this.props.app.component}
            />;
    }

}

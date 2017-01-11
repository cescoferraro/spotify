import * as React from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import Component = React.Component;
declare const require: any;

const LeftIcon = () => <IconButton><NavigationClose /></IconButton>;
const Alert = (name) => {
    alert(name)
};

export default function Shell(Component) {
    return React.createClass({
        getInitialState() {
            return {version: "0.0.0"}
        },


        render: function () {
            return (<MuiThemeProvider>
                    <div>
                        <AppBar
                            showMenuIconButton={false}
                            title={"API CESCO " + this.state.version}/>
                        <Component {...this.props}/>
                    </div>
                </MuiThemeProvider>
            );
        }
    });
};

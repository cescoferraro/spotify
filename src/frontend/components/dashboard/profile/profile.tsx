import * as React from "react";

declare let require: any;
let styles = require("./profile.pcss");

interface ProfileProps {
    profile: {
        id: string;
        email: string;
        images: any;
    };
}
export default class Profile extends React.Component<ProfileProps, any> {
    render() {
        return (<div className={styles.profile}>
            <h2>ID: {this.props.profile.id}</h2>
            <h2>ID: {this.props.profile.email}</h2>
            <h2>ID: {this.props.profile.email}</h2>
        </div>);
    };
};

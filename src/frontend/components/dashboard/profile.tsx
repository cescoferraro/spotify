import * as React from "react";


interface ProfileProps {
    profile: {
        id: string;
        email: string;
        images: any;
    };
}
export default class Profile extends React.Component<ProfileProps, any> {


    render() {
        return (<div>
            <h2>ID: {this.props.profile.id}</h2>
            <h2>Email: {this.props.profile.email}</h2>
        </div>);
    };
};

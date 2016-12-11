import * as React from "react";
import * as MUI from "muicss/react";


interface ProfileProps {
    profile: {id: string; email: string;images: any}
}
export default class Profile extends React.Component<ProfileProps, any> {


    render() {
        console.log(this.props.profile.id);
        console.log(this.props.profile.email);
        return <div>
            <h2>Profile:</h2>
            <MUI.Divider/>
            <h2>ID: {this.props.profile.id}</h2>
            <h2>Email: {this.props.profile.email}</h2>
        </div>
    }
}

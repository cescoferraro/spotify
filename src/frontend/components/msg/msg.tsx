import * as React from "react";

export interface MessageProps {
    message: string;
}


export default class Message extends React.Component <MessageProps, any> {
    render() {
        return (
            <div>
                <h2>Message Component</h2>
                <h2>{this.props.message}</h2>
            </div>
        );
    }
}

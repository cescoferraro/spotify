import * as React from "react";
import RepeatIcon from 'material-ui/svg-icons/av/repeat'
import RepeatOne from 'material-ui/svg-icons/av/repeat-one'
import * as CSS from "./main.css"
import IconButton from 'material-ui/IconButton'
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/empty';
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import { API_URL } from "../../../shared/api/index";

export class Repeat extends React.Component<any, any>{

    constructor(props) {
        super(props)
        this.state = { current: 0, modes: ["off", "context", "track"] }
    }

    toggleRepeat() {
        const { current, modes } = this.state
        let next = current === (modes.length - 1) ? 0 : current + 1
        console.log(modes[next])

        Observable.ajax({
            url: API_URL() + "/repeat/" + modes[next],
            body: this.props.token,
            method: "POST",
            responseType: 'json',
            crossDomain: true
        }).map((user) => {
            this.setState(
                { current: next, playlists: user.response }
            )
        }).catch((err: any, caught: any) => {
            console.log(err)
            return Observable.empty()
        }).subscribe((success) => {
            console.log(success)
        })
    }
    render() {
        const { current, modes } = this.state
        console.log(this.props)
        return (
            <IconButton
                iconStyle={this.props.iconStyle}
                style={this.props.style}
                onClick={this.toggleRepeat.bind(this)}
            >

                {current === 0 ? <RepeatIcon className={CSS.grey} /> :
                    current === 1 ? <RepeatIcon /> :
                        current === 2 ? <RepeatOne /> : null}
            </IconButton>
        )

    }

}

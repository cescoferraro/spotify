import * as React from "react";
import RepeatIcon from 'material-ui/svg-icons/av/repeat'
import RepeatOne from 'material-ui/svg-icons/av/repeat-one'
import * as CSS from "./teste.css"
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
    render() {
        const { current, modes } = this.state
        return (
            <div>
                <IconButton
                    iconStyle={{ width: 60, height: 60, }}
                    style={{ width: 120, height: 120, padding: 30 }}
                    onClick={() => {
                        let next = current === (modes.length - 1) ? 0 : current + 1
                        console.log(modes[next])

                        Observable.ajax({
                            url: API_URL() + "/repeat/" + modes[next],
                            body: this.props.token,
                            method: "POST",
                            responseType: 'json',
                            crossDomain: true
                        })
                            .map((user) => {
                                console.log(user.status)
                                this.setState({ playlists: user.response })
                            }).catch((err: any, caught: any) => {
                                console.log(err)
                                return Observable.empty()
                            }).subscribe((success) => {
                                console.log(success)
                                this.setState({ current: next })
                            })
                    }}
                >

                    {current === 0 ? <RepeatIcon className={CSS.grey} /> :
                        current === 1 ? <RepeatIcon /> :
                            current === 2 ? <RepeatOne /> : null}
                </IconButton>
            </div>
        )

    }

}

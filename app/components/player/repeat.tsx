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
import { compose } from "recompose"
import { connect } from "react-redux"

export class RepeatClass extends React.Component<any, any>{
    states = ["off", "context", "track"]
    current = 0

    render() {
        this.current = this.states.findIndex(
            (state) => (this.props.player.now.repeat_state === state))
        return (
            <IconButton
                className={this.props.className}
                onClick={() => {
                    this.props.dispatch({
                        type: "REPEAT",
                        payload: {
                            current: this.current,
                            states: this.states,
                            token: this.props.token
                        }
                    })
                }}
            >
                {this.current === 0 ? <RepeatIcon className={CSS.grey} /> :
                    this.current === 1 ? <RepeatIcon /> :
                        this.current === 2 ? <RepeatOne /> : null}
            </IconButton>
        )

    }

}
export const Repeat = compose(connect())(RepeatClass)

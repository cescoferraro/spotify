import * as React from "react"
import RepeatIcon from "material-ui/svg-icons/av/repeat"
import RepeatOne from "material-ui/svg-icons/av/repeat-one"
import * as CSS from "./player.css"
import IconButton from "material-ui/IconButton"
import { compose } from "recompose"
import { connect } from "react-redux"

export class RepeatClass extends React.Component<any, any> {
    private states = ["off", "context", "track"]
    private current = 0
    constructor(props) {
        super(props)
        this.repeat = this.repeat.bind(this)

    }
    public render() {
        this.current = this.states.findIndex(
            (state) => (this.props.player.now.repeat_state === state))
        const heus = {
            0: <RepeatIcon className={CSS.grey} />,
            1: <RepeatIcon />,
            2: <RepeatOne />
        }
        return (
            <IconButton
                className={this.props.className}
                onClick={this.repeat}
            >
                {heus[this.current]}
            </IconButton>
        )

    }
    private repeat() {
        this.props.dispatch({
            type: "REPEAT",
            payload: {
                current: this.current,
                states: this.states,
                token: this.props.token
            }
        })
    }
}

export const Repeat = compose(connect())(RepeatClass)

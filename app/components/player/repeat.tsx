import * as React from "react"
import RepeatIcon from "material-ui/svg-icons/av/repeat"
import RepeatOne from "material-ui/svg-icons/av/repeat-one"
import * as CSS from "./player.css"
import IconButton from "material-ui/IconButton"
import { compose } from "recompose"
import { connect } from "react-redux"

export class RepeatButton extends React.Component<any, any> {
    private current = 0
    private states = ["off", "context", "track"]
    private iconMap = {
        0: <RepeatIcon className={CSS.grey} />,
        1: <RepeatIcon />,
        2: <RepeatOne />
    }
    constructor(props) {
        super(props)
        this.repeat = this.repeat.bind(this)
    }
    public render() {
        this.current = this.states.findIndex(
            (state) => (this.props.player.repeat_state === state))
        return (
            <IconButton className={CSS.button} onClick={this.repeat} >
                {this.iconMap[this.current]}
            </IconButton>
        )

    }
    private repeat() {
        const { states, current } = this
        const { token } = this.props
        this.props.DISPATCH("REPEAT", { current, states, token })
    }
}


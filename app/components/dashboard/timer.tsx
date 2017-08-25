import * as React from "react"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import * as CSS from "./main.css"
import { connect } from "react-redux"
import { compose } from "recompose"

class TimerComponent extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = { interval: 6, on: false, setInterval: null }
        this.timer = this.timer.bind(this)
        this.setTimerInterval = this.setTimerInterval.bind(this)
    }
    public render() {
        return (
            <div className={CSS.flex} >
                <TextField
                    className={CSS.select}
                    floatingLabelText="Interval between skips [seconds]"
                    floatingLabelFixed={true}
                    value={this.state.interval}
                    type="number"
                    onChange={this.setTimerInterval}
                    hintText="Number of seconds betwenn skips."
                />
                <RaisedButton
                    className={CSS.selectButton}
                    backgroundColor={this.state.on ? "#Ff0000" : "#6ae368"}
                    label={this.state.on ? "Stop" : "Start"}
                    onClick={this.timer}
                />
            </div>
        )
    }
    private setTimerInterval(event, newValue) {
        this.setState({ interval: newValue })
    }
    private timer() {
        if (!this.state.on) {
            const sub = setInterval(() => {
                this.props.dispatch(
                    {
                        type: "NEXT",
                        payload: { token: this.props.token }
                    }
                )
            }, this.state.interval * 1000)
            this.setState({ setInterval: sub })
        } else {
            clearInterval(this.state.setInterval)
            this.setState({ setInterval: null })
        }
        this.setState({ on: !this.state.on })
    }
}
export const Timer = compose(connect())(TimerComponent)

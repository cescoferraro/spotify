import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import * as React from "react"
import {connect} from "react-redux"
import {compose} from "recompose"
import * as CSS from "./tools.css"

class TimerComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {interval: 6, on: false, setInterval: null};
        this.timer = this.timer.bind(this);
        this.setTimerInterval = this.setTimerInterval.bind(this)
    }

    public render() {
        return (
            <div>
                <TextField
                    floatingLabelText="Interval between skips [seconds]"
                    floatingLabelFixed={true}
                    value={this.state.interval}
                    fullWidth={true}
                    type="number"
                    className={CSS.select}
                    onChange={this.setTimerInterval}
                    hintText="Number of seconds betwenn skips."
                />
                <RaisedButton
                    backgroundColor={this.state.on ? "#Ff0000" : "#6ae368"}
                    fullWidth={true}
                    label={this.state.on ? "Stop" : "Start"}
                    className={CSS.button}
                    onClick={this.timer}
                />
            </div>
        )
    }

    private setTimerInterval(event: any, newValue: any) {
        this.setState({interval: newValue})
    }

    private timer() {
        if (!this.state.on) {
            const sub = setInterval(() => {
                this.props.dispatch(
                    {
                        type: "NEXT",
                        payload: {token: this.props.token}
                    }
                )
            }, this.state.interval * 1000);
            this.setState({setInterval: sub})
        } else {
            clearInterval(this.state.setInterval);
            this.setState({setInterval: null})
        }
        this.setState({on: !this.state.on})
    }
}

export const Timer = compose(connect())(TimerComponent);

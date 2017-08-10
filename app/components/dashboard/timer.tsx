import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../../shared/api/index"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { controlAPI } from "./control";

export class Timer extends React.Component<any, any>{

    constructor(props) {
        super(props)
        this.state = { hidden: true, on: false, interval: null }
    }
    render() {
        return (
            <div>
                {
                    this.state.hidden ?
                        null : <RaisedButton
                            fullWidth={true}
                            secondary={true}
                            label={(this.state.on ? "Stop" : "Start") + " Interval"}
                            onClick={() => {
                                if (!this.state.on) {
                                    const sub = setInterval(() => {
                                        console.log("tick")
                                        controlAPI(this.props.token, "next")
                                    }, 5000)
                                    this.setState({ interval: sub })
                                } else {
                                    clearInterval(this.state.interval)
                                    this.setState({ interval: null })
                                }
                                this.setState({ on: !this.state.on })
                            }}
                        />
                }

                {this.state.on ? this.state.interval.__idleStart : 33}
                <RaisedButton
                    fullWidth={true}
                    secondary={true}
                    label={(this.state.hidden ? "Show" : "Hide") + " Time"}
                    onClick={() => {
                        console.log("start")
                        console.log(this.state.hidden)
                        this.setState({ hidden: !this.state.hidden })
                    }}
                />
            </div>
        )

    }
}

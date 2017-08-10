import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../../shared/api/index"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { controlAPI } from "./player";
import TextField from 'material-ui/TextField';
import * as CSS from "./teste.css"

export class Timer extends React.Component<any, any>{

    constructor(props) {
        super(props)
        this.state = { interval: 6, on: false, setInterval: null }
    }
    render() {
        return (
            <div className={CSS.flex} >
                <TextField
                    className={CSS.select}
                    floatingLabelText="Interval between skips [seconds]"
                    floatingLabelFixed={true}
                    value={this.state.interval}
                    type="number"
                    onChange={(event, newValue) => {
                        this.setState({ interval: newValue })
                    }}
                    hintText="Number of seconds betwenn skips."
                />
                <RaisedButton
                    className={CSS.selectButton}
                    backgroundColor={this.state.on ? "red" : "green"}
                    label={(this.state.on ? "Stop" : "Start") + " Interval"}
                    onClick={() => {
                        if (!this.state.on) {
                            const sub = setInterval(() => {
                                console.log("tick")
                                controlAPI(this.props.token, "next")
                            }, this.state.interval * 1000)
                            this.setState({ setInterval: sub })
                        } else {
                            clearInterval(this.state.setInterval)
                            this.setState({ setInterval: null })
                        }
                        this.setState({ on: !this.state.on })
                    }}
                />
            </div>
        )

    }
}

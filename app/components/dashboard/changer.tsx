import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../../shared/api/index"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as CSS from "./teste.css"

const playID = (ID, token) => {
    Observable.ajax({
        url: API_URL() + "/play/" + ID,
        body: token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    })
        .map((user) => {
            console.log(user.response)
        }).subscribe((success) => {
            console.log("done")
        })
}


export class Plays extends React.Component<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            value: "spotify:track:3ZFwFe104aquLWAwagKgtg"
        }
    }
    handleChange(event, index, value) {
        console.log(value)
        this.setState({ value });
    }
    render() {
        return (
            <div className={CSS.flex}>
                <SelectField
                    hintText="Select a name"
                    className={CSS.select}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                >
                    {
                        URIS.map((name) => (
                            <MenuItem
                                key={name.key}
                                insetChildren={true}
                                value={name.value}
                                primaryText={name.name}
                            />))}
                </SelectField>
                <RaisedButton
                    className={CSS.selectButton}
                    secondary={true}
                    label="Play"
                    onClick={() => {
                        playID(this.state.value, this.props.token)
                    }}
                />
            </div>
        )

    }
}
const URIS = [
    {
        value: "spotify:track:3ZFwFe104aquLWAwagKgtg",
        key: 1,
        name: 'Kendrick Lamar - Blood'
    },
    {
        value: "spotify:track:2r9ShGMVZNZ4yzIkku3Awk",
        key: 2,
        name: 'A$AP Ferg - Let it go'
    }
]

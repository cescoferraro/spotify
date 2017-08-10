import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../../shared/api/index"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export const controlAPI = (token, control) => {
    Observable.ajax({
        url: API_URL() + "/" + control,
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

export const NEXTComponent = ({ token }) => {
    return <div>
        <RaisedButton
            fullWidth={true}
            secondary={true}
            label="Next song"
            onClick={() => {
                controlAPI(token, "next")
            }}
        />
        <br />
        <RaisedButton
            fullWidth={true}
            secondary={true}
            label="stop song"
            onClick={() => {
                controlAPI(token, "pause")
            }}
        />
        <br />
        <RaisedButton
            fullWidth={true}
            secondary={true}
            label="Previoius song"
            onClick={() => {
                controlAPI(token, "previous")
            }}
        />
        <br />
    </div>

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

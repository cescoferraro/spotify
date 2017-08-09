import * as React from "react";

import RaisedButton from 'material-ui/RaisedButton'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../../shared/api/index";
const nextSong = (token) => {
    Observable.ajax({
        url: API_URL() + "/next",
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
const previousSong = (token) => {
    Observable.ajax({
        url: API_URL() + "/previous",
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
            backgroundColor="black"
            fullWidth={true}
            secondary={true}
            label="Next song"
            onClick={() => {
                nextSong(token)
            }}
        />
        <br />
        <RaisedButton
            backgroundColor="black"
            fullWidth={true}
            secondary={true}
            label="Previoius song"
            onClick={() => {
                previousSong(token)
            }}
        />
    </div>

}

import * as React from "react";
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import RaisedButton from 'material-ui/RaisedButton'
import { API_URL } from "../../../shared/api/index";
import * as CSS from "./teste.css"

export class Top5 extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            followers: []
        };
    }
    getTOP5() {
        Observable.ajax({
            url: API_URL() + "/top5",
            body: this.props.token,
            method: "POST",
            responseType: 'json',
            crossDomain: true
        })
            .map((user) => {
                console.log(user.response)
                this.setState({ followers: user.response.items })
            }).subscribe((success) => {
                console.log("done")
            })

    }
    render() {
        console.log(this)
        return <div className={CSS.feature} >
            <RaisedButton
                backgroundColor="black"
                fullWidth={true}
                secondary={true}
                label="TOP5 ARTISTS"
                onClick={() => {
                    this.getTOP5()
                    this.setState({ hidden: !this.state.hidden })
                }}
            />
            {this.state.hidden ? null : <div>
                {this.state.followers.map((follower) => {
                    return <div key={Math.random()} className={CSS.flex}>
                        <h4><a href={follower.href}>{follower.name}</a></h4>
                    </div>
                })}
            </div>}
        </div>

    }

}

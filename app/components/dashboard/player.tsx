import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../../shared/api/index"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import SkipNext from 'material-ui/svg-icons/av/skip-next'
import Stop from 'material-ui/svg-icons/av/stop'
import Pause from 'material-ui/svg-icons/av/pause'
import Loop from 'material-ui/svg-icons/av/fiber-manual-record'
import RepeatOne from 'material-ui/svg-icons/av/repeat-one'
import * as CSS from "./teste.css"
import { Repeat } from "./repeat";
import { Timer } from "./timer";
import { Plays } from "./changer";


const styles = {
    largeIcon: {
        width: 60,
        height: 60,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
};
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



export const Player = ({ token }) => {
    return (
        <div >
            <Plays token={token} />
            <Timer token={token} />
            <div className={CSS.flex} >
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    onClick={() => {
                        controlAPI(token, "previous")
                    }}
                >
                    <SkipPrevious />
                </IconButton>
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}

                    onClick={() => {
                        controlAPI(token, "pause")
                    }}
                >
                    <Stop />
                </IconButton>
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}

                    onClick={() => {
                        controlAPI(token, "pause")
                    }}
                >
                    <Pause />
                </IconButton>
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    onClick={() => {
                        controlAPI(token, "play")
                    }}
                >
                    <PlayIcon />
                </IconButton>
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}

                    onClick={() => {
                        controlAPI(token, "next")
                    }}
                >
                    <SkipNext />
                </IconButton>
                <Repeat token={token} />
            </div>
        </div>
    )

}

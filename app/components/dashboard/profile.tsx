import * as React from "react"
import * as CSS from "./main.css"
import { Following } from "./following"
import { MyPlaylists } from "./playlist"
import { Player } from "../player/player"
import { Plays } from "./changer";
import { Timer } from "./timer";
import Subheader from "material-ui/Subheader"
import { INFO } from "./info";

export const SPOTIFYProfile = ({ dispatch, token, payload, css }) => {
    console.log(payload)
    return (
        <div>
            <div className={css.container}>
                <div>
                    <Subheader> User Information </Subheader>
                    <div className={css.pad} >
                        <INFO payload={payload} />
                    </div>
                </div>
                <Player token={token} dispatch={dispatch} />
                <div>
                    <Subheader> Player Controls </Subheader>
                    <div className={css.pad} >
                        <h2>sdjknfs</h2>
                        <Plays token={token} />
                        <Timer token={token} />
                    </div>
                </div>
                <div>
                    <Subheader> Player Controls </Subheader>
                    <div className={css.pad} >
                        <Following token={token} />
                        <MyPlaylists token={token} />
                    </div>
                </div>
            </div>
        </div>
    )
}

import * as React from "react"
import * as CSS from "./teste.css"
import { Following } from "./following"
import { MyPlaylists } from "./playlist"
import { Player } from "./player"
import { Plays } from "./changer";
import { Timer } from "./timer";

import Subheader from "material-ui/Subheader"

export const Info = ({ payload }) => {
    return <div>
        <h2 style={{ marginTop: "0px" }}>
            <a href={payload.user.external_urls.spotify} >
                {payload.user.display_name}</a>
        </h2>
        <h2>{payload.user.email}</h2>
    </div>
}

export const SPOTIFYProfile = ({ dispatch, token, payload, css }) => {
    console.log(payload)
    return (
        <div>
            <div className={css.container}>
                <div>
                    <Subheader> User Information </Subheader>
                    <div className={css.pad} >
                        <Info payload={payload} />
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

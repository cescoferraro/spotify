import * as React from "react"
import * as CSS from "./teste.css"
import { Following } from "./following"
import { MyPlaylists } from "./playlist"
import { Player } from "./player"


export const SPOTIFYProfile = ({ token, payload, css }) => {
    console.log(payload)
    return (
        <div className={css.test}>
            <h2>
                <a href={payload.user.external_urls.spotify} >
                    {payload.user.display_name}</a>
            </h2>
            <h2>{payload.user.email}</h2>


            <Following token={token} />
            <MyPlaylists token={token} />
            <Player token={token} />
        </div>
    )
}

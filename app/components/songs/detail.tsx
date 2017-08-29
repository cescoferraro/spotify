import * as React from "react";
import * as CSS from "./song.css"
import Subheader from "material-ui/Subheader"

export const SongsDetail = ({ ROUTER_ACTION, location }) => {
    const song = location.payload.data
    return <div className={CSS.container} >
        <Subheader>Song</Subheader>
        <div onClick={() => {
            ROUTER_ACTION(
                "DASHBOARD",
                {
                    token: location.payload.token,
                    state: location.payload.state,
                    tab: "songs",
                    user: location.payload.user
                }
            )

        }} className={CSS.content} >
            <div>
                <div className={CSS.image} >
                    <img alt="" src={song.album.images[0].url} />
                </div>
                <div className={CSS.data} >
                    <h2><a href={song.external_urls.spotify}>{song.name}</a></h2>
                    <h4>Popularity: {song.popularity}</h4>
                </div>
            </div>
        </div>
    </div>

}

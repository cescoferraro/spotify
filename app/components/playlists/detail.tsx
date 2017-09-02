import * as React from "react";
import Subheader from "material-ui/Subheader"
import * as CSS from "./playlists.css"

export const GoBack = (tab, props) => () => {
    props.DISPATCH("DASHBOARD", { tab })
}

export const PlaylistsDetail = (props) => {
    const { id, playlists, token, DISPATCH } = props
    const playlist = playlists.detail
    console.log(playlist)
    const onClick = GoBack("playlists", props)
    return <div className={CSS.container} >
        <Subheader>Playlist</Subheader>
        <div className={CSS.content} >
            <div>
                <div onClick={onClick} className={CSS.image} >
                    <img alt="" src={playlist.images[0].url} />
                </div>
                <div className={CSS.data} >
                    <h2><a href={playlist.external_urls.spotify}>{playlist.name}</a></h2>
                    <h2>{playlists.id}</h2>
                </div>
            </div>
        </div>
    </div>
}

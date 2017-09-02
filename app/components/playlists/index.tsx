import * as React from "react"
import { PlaylistsDetail } from "./detail";
import { PlaylistsDisplay } from "./display";

export const Playlists = (props) => {
    const { payload } = props.location
    return payload.id && payload.tab === "playlists" ?
        <PlaylistsDetail {...props} /> :
        <PlaylistsDisplay {...props} />
}

import * as React from "react"
import { SongsDetail } from "./detail";
import { SongsList } from "./list";

export const Songs = (props) => {
    const { payload } = props.location
    return payload.id && payload.tab === "songs" ?
        <SongsDetail {...props} /> :
        <SongsList {...props} />
}

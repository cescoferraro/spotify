import * as React from "react"
import { SongsDetail } from "./detail";
import { SongsDisplay } from "./display";

export const Songs = (props) => {
    const { id, tab } = props.location.payload
    return id && tab === "songs" ?
        <SongsDetail {...props} /> :
        <SongsDisplay {...props} />
}

import * as React from "react"
import { SongsDetail } from "./detail";
import { SongsDisplay } from "./display";

export const Songs = (props) => {
    const { payload } = props.location
    return payload.id && payload.tab === "songs" ?
        <SongsDetail {...props} /> :
        <SongsDisplay {...props} />
}

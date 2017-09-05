import * as React from "react"
import { ArtistDetail } from "./detail";
import { ArtistList } from "./list";

export const Following = (props) => {
    const { id, tab } = props.location.payload
    return id && tab === "following" ?
        <ArtistDetail {...props} /> :
        <ArtistList {...props} />
}

import * as React from "react"
import { ArtistDetail } from "./detail";
import { ArtistList } from "./list";

export const Following = (props) => {
    return props.location.payload.id && props.location.payload.tab === "following" ?
        <ArtistDetail {...props} /> : <ArtistList {...props} />
}

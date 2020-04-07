import * as React from "react"
import {ArtistDetail} from "./detail";
import {ArtistList} from "./list";

export const Following = (props: any) => {
    return props.location.payload.id && props.location.payload.tab === "following" ?
        <ArtistDetail {...props} /> : <ArtistList {...props} />
};

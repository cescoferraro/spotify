import * as React from "react";
import * as CSS from "./following.css"

export const ArtistDetail = (props) => {
    const artist = props.location.payload.data
    console.log(artist)
    return <div className={CSS.container}>
        <h2><a href={artist.href}>{artist.name}</a></h2>
        <h2>{artist.popularity}</h2>
        {artist.genres.map((genre, key) => (<h2 key={key}>{genre}</h2>))}
    </div>
}

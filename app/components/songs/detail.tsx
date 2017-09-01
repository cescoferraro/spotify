import * as React from "react";
import * as CSS from "./song.css"
import Subheader from "material-ui/Subheader"
import IconButton from 'material-ui/IconButton';
import PlayIcon from "material-ui/svg-icons/av/play-arrow"

const GoBack = (props) => () => {
    console.log(props)
    props.ROUTER_ACTION(
        "DASHBOARD",
        {
            token: props.token,
            tab: "songs",
            user: props.user

        }
    )
}

export const SongsDetail = (props) => {
    const { ROUTER_ACTION, location, token, dispatch } = props
    const song = location.payload.data
    const onClick = GoBack(props)
    console.log("99999999999999999999")
    console.log(token)
    console.log(song)
    console.log("99999999999999999999")
    return (
        <div className={CSS.container} >
            <Subheader>Song</Subheader>
            <div className={CSS.content} >
                <div>
                    <div onClick={onClick} className={CSS.image} >
                        <img alt="" src={song.album.images[0].url} />
                    </div>
                    <div className={CSS.data} >
                        <h2><a href={song.external_urls.spotify}>{song.name}</a></h2>
                        <h4>Popularity: {song.popularity}</h4>
                    </div>
                    <IconButton
                        className={CSS.playContainer}
                        iconClassName={CSS.playIcon}
                        onClick={() => {
                            dispatch({ type: "PLAY_SONG", payload: { token, song: song.uri } })
                        }}
                    >
                    </IconButton>
                </div>
            </div>
        </div>
    )

}

import * as React from "react";
import * as CSS from "./song.css"
import Subheader from "material-ui/Subheader"
import IconButton from 'material-ui/IconButton';
import PlayIcon from "material-ui/svg-icons/av/play-arrow"
import ReactStars from 'react-stars'
export const GoBack = (tab, props) => () => {
    props.DISPATCH("DASHBOARD", { tab })
}

export const SongsDetail = (props) => {
    const { id, songs, token, DISPATCH } = props
    console.log(id)
    const song = songs.detail
    const onClick = GoBack("songs", props)
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
                        <h2>{song.id}</h2>
                        <ReactStars count={5} value={song.popularity / 20} size={24} color2={'#ffd700'} />
                    </div>
                    <IconButton
                        className={CSS.playContainer}
                        onClick={() => {
                            console.log(token)
                            DISPATCH("PLAY_SONG", { token, song: song.uri })
                        }}
                    >
                        <PlayIcon className={CSS.playIcon} />
                    </IconButton>
                </div>
            </div>
        </div>
    )

}
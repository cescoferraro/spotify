import * as React from "react"
import IconButton from "material-ui/IconButton"
import PlayIcon from "material-ui/svg-icons/av/play-arrow"
import SkipPrevious from "material-ui/svg-icons/av/skip-previous"
import SkipNext from "material-ui/svg-icons/av/skip-next"
import Stop from "material-ui/svg-icons/av/stop"
import Pause from "material-ui/svg-icons/av/pause"
import * as CSS from "./player.css"
import { connect } from "react-redux"
import { compose } from "recompose"
import Subheader from "material-ui/Subheader"
import { Repeat } from "./repeat"
import { NOW } from "./now"
import { Volume } from "./volume"

export const Player = compose(
    connect()
)(({ dispatch, token, player, location }) => {
    const IconProps = IconPropCreator(dispatch, token)
    return (
        <div className={CSS.main}>
            <div className={CSS.center}>
                <NOW player={player} />
                <div className={CSS.controls}>
                    <div >
                        <IconButton {...IconProps("PREVIOUS") } >
                            <SkipPrevious />
                        </IconButton>
                        <IconButton {...IconProps("PAUSE") } >
                            <Stop />
                        </IconButton>
                        <IconButton {...IconProps("PAUSE") } >
                            <Pause />
                        </IconButton>
                        <IconButton {...IconProps("PLAY") } >
                            <PlayIcon />
                        </IconButton>
                        <IconButton {...IconProps("NEXT") } >
                            <SkipNext />
                        </IconButton>
                        <Repeat
                            className={CSS.button}
                            {...IconProps("NEXT") }
                            player={player}
                            token={token}
                        />
                    </div>
                    <Volume
                        dispatch={dispatch}
                        player={player}
                        token={token}
                    />
                </div>
            </div>
        </div>
    )

})

const IconPropCreator = (dispatch, token) =>
    (type) => {
        return {
            onClick: () => {
                dispatch({ type, payload: { token } })
            }
        }
    }

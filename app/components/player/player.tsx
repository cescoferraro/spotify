import * as React from "react";
import { API_URL } from "../../../shared/api/index"
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import SkipNext from 'material-ui/svg-icons/av/skip-next'
import Stop from 'material-ui/svg-icons/av/stop'
import Pause from 'material-ui/svg-icons/av/pause'
import Loop from 'material-ui/svg-icons/av/fiber-manual-record'
import RepeatOne from 'material-ui/svg-icons/av/repeat-one'
import * as CSS from "./main.css"
import { connect } from "react-redux"
import { compose } from "recompose"
import Subheader from "material-ui/Subheader"
import { Repeat } from "./repeat";
import { NOW } from "./now";

export const Player = compose(
    connect()
)(({ dispatch, token, player }) => {
    const IconProps = IconPropCreator(dispatch, token)
    return (
        <div className={CSS.main}>
            <Subheader> Player Controls </Subheader>
            <div >
                <NOW player={player} />
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

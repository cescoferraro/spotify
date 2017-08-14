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
import { Repeat } from "./repeat";
import { Timer } from "./timer";
import { Plays } from "./changer";
import { connect } from "react-redux"
import { compose } from "recompose"
import Subheader from "material-ui/Subheader"

export const Player = compose(
    connect()
)(({ dispatch, token }) => {
    const IconProps = IconPropCreator(dispatch, token)
    return (
        <div>
            <Subheader> Player Controls </Subheader>
            <div className={CSS.pad}>
                <div className={CSS.flex} >
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
                        {...IconProps("NEXT") }
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
            iconStyle: {
                width: "60px",
                height: "60px"
            },
            style: {
                width: "10vw",
                height: "10vw",
                padding: "10px"
            },
            onClick: () => {
                dispatch({ type, payload: { token } })
            }
        }
    }

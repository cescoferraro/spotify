import IconButton from "material-ui/IconButton"
import Pause from "material-ui/svg-icons/av/pause"
import PlayIcon from "material-ui/svg-icons/av/play-arrow"
import SkipNext from "material-ui/svg-icons/av/skip-next"
import SkipPrevious from "material-ui/svg-icons/av/skip-previous"
import Stop from "material-ui/svg-icons/av/stop"
import * as React from "react"
import {connect} from "react-redux"
import {compose} from "recompose"
import {NOW} from "./now"
import * as CSS from "./player.css"
import {Repeat} from "./repeat"
import {Volume} from "./volume"

export const Player = compose(
    connect()
)((props: any) => {
    const IconProps = IconPropCreator(props.DISPATCH, props.token);
    return (
        <div className={CSS.main}>
            <div className={CSS.center}>
                <NOW {...props} />
                <div className={CSS.controls}>
                    <div>
                        <IconButton {...IconProps("PREVIOUS")} >
                            <SkipPrevious/>
                        </IconButton>
                        <IconButton {...IconProps("PAUSE")} >
                            <Stop/>
                        </IconButton>
                        <IconButton {...IconProps("PAUSE")} >
                            <Pause/>
                        </IconButton>
                        <IconButton {...IconProps("PLAY")} >
                            <PlayIcon/>
                        </IconButton>
                        <IconButton {...IconProps("NEXT")} >
                            <SkipNext/>
                        </IconButton>
                        <Repeat className={CSS.button} {...props} {...IconProps("NEXT")} />
                    </div>
                    <Volume {...props} />
                </div>
            </div>
        </div>
    )

});

const IconPropCreator = (dispatch: any, token: any) =>
    (type: any) => {
        return {
            onClick: () => {
                dispatch(type, {token})
            }
        }
    };

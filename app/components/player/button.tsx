import * as React from "react"
import IconButton from "material-ui/IconButton"
import PlayIcon from "material-ui/svg-icons/av/play-arrow"
import SkipPrevious from "material-ui/svg-icons/av/skip-previous"
import SkipNext from "material-ui/svg-icons/av/skip-next"
import Stop from "material-ui/svg-icons/av/stop"
import Pause from "material-ui/svg-icons/av/pause"
import Subheader from "material-ui/Subheader"
import { RepeatButton } from "./repeat"

const IconMap = {
    play: <PlayIcon />,
    previous: <SkipPrevious />,
    next: <SkipNext />,
    pause: <Pause />,
    stop: <Stop />,
}

const go = (props) => {
    const { title, token, player } = props
    console.log(props.player.current_device)
    const device = player.devices[player.current_device]
    return () => {
        props.DISPATCH(title.toUpperCase(), { token, device })
    }
}

export const PlayerButton = (props) => {
    return (
        <IconButton onClick={go(props)} >
            {IconMap[props.title]}
        </IconButton>
    )
}

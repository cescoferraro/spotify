import * as React from "react"
import * as CSS from "./player.css"
import { CurrentSong } from "./now"
import { Volume } from "./volume"
import { PlayerButton } from "./button"
import { RepeatButton } from "./repeat"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { CurrentDevice } from "./device"

export const Player = (props) => {
    return (
        <div className={CSS.main}>
            <div className={CSS.center}>
                <CurrentDevice {...props} />
                <CurrentSong {...props} />
                <div className={CSS.controls}>
                    <div >
                        <PlayerButton { ...props } title="previous" />
                        <PlayerButton { ...props } title="stop" />
                        <PlayerButton { ...props } title="pause" />
                        <PlayerButton { ...props } title="play" />
                        <PlayerButton { ...props } title="next" />
                        <RepeatButton {...props} />
                    </div>
                    <Volume {...props} />
                </div>
            </div>
        </div>
    )
}

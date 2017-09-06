import * as React from "react"
import * as CSS from "./player.css"
import { CurrentSong } from "./now"
import { Volume } from "./volume"
import { PlayerButton } from "./button"
import { RepeatButton } from "./repeat"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
export const Player = (props) => {
    console.log(444444444444444444444444444444444)
    console.log(props)
    const IndexedDevies = props.player.devices.map((device, index) => {
        return { ...device, index }
    })
    console.log(IndexedDevies)
    return (
        <div className={CSS.main}>
            <div className={CSS.center}>
                <div>
                    <SelectField
                        id="device_selector"
                        value={props.player.current_device}
                        onChange={(event, index, device) => {
                            console.log(event)
                            console.log(index)
                            console.log(device)
                            if (IndexedDevies.length !== 0) {
                                props.DISPATCH("SET_DEVICE", device)
                            }
                        }}
                        hintText="Select a name" >
                        {IndexedDevies.length !== 0 ? IndexedDevies
                            .map((device) => (<MenuItem value={device.index} key={Math.random()} primaryText={device.name} />))
                            : <MenuItem value={0} key={Math.random()} primaryText={"You do not have any active Spotify Device"} />
                        }
                    </SelectField>
                </div>
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

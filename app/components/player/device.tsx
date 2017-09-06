import * as React from "react"
import * as CSS from "./player.css"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export const CurrentDevice = (props) => {
    const { player } = props
    const activeDevice = player.devices.filter((device) => { return device.is_active })
    const hasActiveDevice = activeDevice[0] ? true : false
    return (
        <div className={CSS.device}>
            <h2>
                {activeDevice[0] ? activeDevice[0].name : "no active device"}
            </h2>
            <SelectField
                id="device_selector"
                floatingLabelFixed={true}
                fullWidth={true}
                floatingLabelText="Dispatching actions to the device"
                value={hasActiveDevice ? player.current_device : 9999}
                onChange={(event, index, device) => {
                    if (hasActiveDevice) {
                        props.DISPATCH("SET_DEVICE", index)
                    }
                }}
                hintText="Select a name"
            >
                {
                    hasActiveDevice ?
                        player.devices.map((device, index) => { return <MenuItem value={index} key={Math.random()} primaryText={device.name} /> }) :
                        <MenuItem value={9999} key={Math.random()} primaryText={"No active device"} />
                }
            </SelectField>
        </div>
    )
}
                /* value={hasActiveDevice ? player.devices.indexOf(activeDevice[0]) : 9999} */

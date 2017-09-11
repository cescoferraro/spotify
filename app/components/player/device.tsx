import * as React from "react"
import * as CSS from "./player.css"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ActiveDevice } from "./active";

export const fromPlayerCurrentDevice = (player) => {
    const localComponentDevices = player.devices
        .map((device, index) => ({ ...device, value: index }))
    const currentDevice = localComponentDevices
        .filter((device) => (device.id === player.current_device))
    const currentValue = currentDevice.length !== 0 ? currentDevice[0].value : 9999
    return { localComponentDevices, currentDevice, currentValue }
}

export const CurrentDevice = (props) => {
    const { player } = props
    const stateDevice = fromPlayerCurrentDevice(player)
    console.log(stateDevice.localComponentDevices)
    console.log(stateDevice.currentDevice)
    console.log(stateDevice.currentValue)
    return (
        <div className={CSS.device}>
            <ActiveDevice player={player} />
            <SelectField
                id="device_selector"
                hintText="Select a name"
                floatingLabelText="Dispatching actions to the device"
                floatingLabelFixed={true}
                fullWidth={true}
                value={stateDevice.currentValue}
                onChange={(event, index, device) => {
                    if (device === 9999) {
                        props.DISPATCH("SET_DEVICE", "")
                    } else {
                        props.DISPATCH("SET_DEVICE",
                            stateDevice.localComponentDevices[device].id
                        )
                    }
                }}
            >
                <MenuItem
                    value={9999}
                    key={Math.random()}
                    primaryText={"Active Device"}
                />
                {stateDevice.localComponentDevices.map(
                    (device, index) =>
                        (<MenuItem
                            value={device.value}
                            key={Math.random()}
                            primaryText={device.name}
                        />))}
            </SelectField>
        </div>
    )
}

import * as React from "react";


export const ActiveDevice = ({ player }) => {
    const activeDevice = player.devices.filter((device) => { return device.is_active })
    return <div>
        <h2>
            {activeDevice[0] ? activeDevice[0].name : "no active device"}
        </h2>
    </div>
}

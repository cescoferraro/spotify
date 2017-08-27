import * as React from "react"
import * as CSS from "./profile.css"

export const INFO = ({ payload }) => {
    return (
        <div className={CSS.container} >
            <h2>
                <a href={payload.user.external_urls.spotify} >
                    {payload.user.display_name}</a>
            </h2>
        </div>
    )
}

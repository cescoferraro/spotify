import * as React from "react"

export const INFO = ({ payload }) => {
    return (
        <div>
            <h2>
                <a href={payload.user.external_urls.spotify} >
                    {payload.user.display_name}</a>
            </h2>
        </div>
    )
}

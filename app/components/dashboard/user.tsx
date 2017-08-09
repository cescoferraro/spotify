import * as React from "react";
import * as CSS from "./teste.css"
import { Top5 } from "./top5"

export const SPOTIFYProfile = ({ token, payload, css }) => {
    console.log(payload)
    return (
        <div className={css.test}>
            <h2>
                <a href={payload.user.external_urls.spotify} >
                    {payload.user.display_name}</a>
            </h2>
            <h2>{payload.user.email}</h2>
            <Top5 token={token} />
            {/* <h2 style={{ overflowWrap: "break-word" }} > */}
            {/* {token} */}
            {/* </h2> */}
        </div>
    )
}

import * as React from "react"
import * as isEmpty from "lodash/isEmpty"
import { LOADING } from "../loading/index"
import * as CSS from "./main.css"
import * as cs from "classnames"

const hejsa = (artist) => {
    return artist.images[0] ? artist.images[0].url :
        "https://google.com/favicon.ico"
}

export const Artist = (props) => {
    return !isEmpty(props.artist) ? (
        <div className={CSS.container}>
            <div className={cs(CSS.layer, CSS.layer1)}>
                <img alt="" src={props.user.images[0].url} />
            </div>
            <div className={cs(CSS.layer, CSS.layer2)}>
                {props.user.display_name}
                {" now "} {props.artist.move}
                {"s "} {props.artist.name}
            </div>
            <div className={cs(CSS.layer, CSS.layer3)}>
                <img
                    alt=""
                    src={hejsa(props.artist)}
                />
            </div>
        </div>
    ) : (
            <LOADING userAgent={props.userAgent} />
        )
}

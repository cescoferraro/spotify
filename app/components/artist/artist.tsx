import * as React from "react";
import * as isEmpty from 'lodash/isEmpty'
import { LOADING } from "../loading/index";
import * as CSS from "./main.css"
import * as cs from "classnames"
export const Artist = (props) => {
    console.log(props)
    console.log(isEmpty)
    return !isEmpty(props.artist) ? (
        <div className={CSS.container}>
            <div className={cs(CSS.layer, CSS.layer1)}>
                <img alt="" src={props.location.payload.user.images[0].url} />
            </div>
            <div className={cs(CSS.layer, CSS.layer2)}>
                {props.location.payload.user.display_name}
                {" now "} {props.artist.move}
                {"s "} {props.artist.name}
            </div>
            <div className={cs(CSS.layer, CSS.layer3)}>
                <img alt="" src={props.artist.images[0].url} />
            </div>
        </div>
    ) : (
            <LOADING userAgent={props.userAgent} />
        )
}

import * as cs from "classnames"
import {isEmpty} from "lodash"
import * as React from "react"
import {LOADING} from "../loading/index"
import * as CSS from "./main.css"

const hejsa = (artist: any) => {
    return artist.images[0] ? artist.images[0].url :
        "https://google.com/favicon.ico"
};

// const isEmpty = (dd: any) => true;
export const Artist = (props: any) => {
    return !isEmpty(props.artist) ? (
        <div className={CSS.container}>
            <div className={cs.default(CSS.layer, CSS.layer1)}>
                <img alt="" src={props.user.images[0].url}/>
            </div>
            <div className={cs.default(CSS.layer, CSS.layer2)}>
                {props.user.display_name}
                {" now "} {props.artist.move}
                {"s "} {props.artist.name}
            </div>
            <div className={cs.default(CSS.layer, CSS.layer3)}>
                <img
                    alt=""
                    src={hejsa(props.artist)}
                />
            </div>
        </div>
    ) : (
        <LOADING userAgent={props.userAgent}/>
    )
};

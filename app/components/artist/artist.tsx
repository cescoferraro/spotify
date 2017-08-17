import * as React from "react";
import * as isEmpty from 'lodash/isEmpty'

export const Artist = (props) => {
    console.log(props)
    console.log(isEmpty)
    return !isEmpty(props.artist) ? (
        <div>
            <h2>{props.location.payload.user.display_name}</h2>
            <h2>{props.artist.move}</h2>
            <h2>{props.artist.name}</h2>
        </div>
    ) : (
            <div>
                <h2>ksajdnjkasd</h2>
            </div>
        )
}

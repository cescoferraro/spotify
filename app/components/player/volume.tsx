import * as React from "react";
import * as CSS from "./main.css"
import { compose } from "recompose"
import { connect } from "react-redux"
import Slider from 'material-ui/Slider'

export class Volume extends React.Component<any, any>{
    render() {
        const { token, dispatch, player } = this.props
        return (
            <span className={CSS.volume}>
                <Slider
                    onChange={(event, newValue) => {
                        dispatch({ type: "SET_VOLUME", payload: newValue * 100 })
                        console.log(newValue)
                    }}
                    onDragStop={(event) => {
                        dispatch({ type: "VOLUME", payload: { token, percent: player.volume } })

                    }}
                    step={0.10} value={player.volume / 100} />
            </span>
        )
    }
}

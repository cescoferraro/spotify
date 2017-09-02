import * as React from "react"
import * as CSS from "./player.css"
import Slider from "material-ui/Slider"

export class Volume extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.fire = this.fire.bind(this)
    }
    public render() {
        return (
            <Slider
                className={CSS.volume}
                onChange={this.onChange}
                onDragStop={this.fire}
                step={0.10}
                value={this.props.player.volume / 100}
            />
        )
    }
    private onChange(event, newValue) {
        this.props.DISPATCH("SET_VOLUME", newValue * 100)
    }
    private fire(event) {
        this.props.DISPATCH({
            type: "VOLUME",
            payload: { token: this.props.token, percent: this.props.player.volume }
        })
    }
}

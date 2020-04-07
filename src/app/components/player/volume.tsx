import Slider from "material-ui/Slider"
import * as React from "react"

export class Volume extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.fire = this.fire.bind(this)
    }

    public render() {
        return (
            <Slider
                // className={CSS.volume}
                onChange={this.onChange}
                onDragStop={this.fire}
                step={0.10}
                value={this.props.player.volume / 100}
            />
        )
    }

    private onChange(event: any, newValue: any) {
        this.props.DISPATCH("SET_VOLUME", newValue * 100)
    }

    private fire(event: any) {
        this.props.DISPATCH({
            type: "VOLUME",
            payload: {token: this.props.token, percent: this.props.player.volume}
        })
    }
}

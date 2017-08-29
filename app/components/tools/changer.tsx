import * as React from "react"
import * as CSS from "./tools.css"
import RaisedButton from "material-ui/RaisedButton"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import { connect } from "react-redux"
import { compose } from "recompose"
import { URIS } from "../../../shared/playlists"

class PlaysClass extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.playSong = this.playSong.bind(this)
        this.state = {
            value: this.props.URIS[0].value
        }
    }
    public render() {
        const items = this.props.URIS.map((name) => (
            <MenuItem
                key={name.key}
                insetChildren={true}
                value={name.value}
                primaryText={name.name}
            />))
        return (
            <div>
                <SelectField
                    hintText="Select a name"
                    floatingLabelText="Play a single song"
                    floatingLabelFixed={true}
                    value={this.state.value}
                    className={CSS.select}
                    fullWidth={true}
                    onChange={this.handleChange}
                >
                    {items}
                </SelectField>
                <RaisedButton
                    secondary={true}
                    className={CSS.button}
                    fullWidth={true}
                    label="Play"
                    onClick={this.playSong}
                />
            </div>
        )

    }

    private playSong() {
        this.props.dispatch({ type: "PLAY_SONG", payload: { token: this.props.token, song: this.state.value } })
    }

    private handleChange(event, index, value) {
        this.setState({ value })
    }
}

export const Plays = compose(
    connect(() => ({ URIS }))
)(PlaysClass)

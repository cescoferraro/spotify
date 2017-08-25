import * as React from "react"
import RaisedButton from "material-ui/RaisedButton"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import * as CSS from "./main.css"
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
                className={CSS.menu}
                insetChildren={true}
                value={name.value}
                primaryText={name.name}
            />))
        return (
            <div className={CSS.flex}>
                <SelectField
                    hintText="Select a name"
                    className={CSS.select}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {items}
                </SelectField>
                <RaisedButton
                    className={CSS.selectButton}
                    secondary={true}
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

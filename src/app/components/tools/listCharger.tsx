import MenuItem from "material-ui/MenuItem"
import RaisedButton from "material-ui/RaisedButton"
import SelectField from "material-ui/SelectField"
import * as React from "react"
import {connect} from "react-redux"
import {compose} from "recompose"
import {URIS} from "../../../shared/playlists"
import * as CSS from "./tools.css"



class ListChargerClass extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.playSong = this.playSong.bind(this);
        this.state = {
            value: [this.props.URIS[0].value]
        }
    }

    public render() {
        const items = this.props.URIS.map((name: any) => (
            <MenuItem
                key={name.key}
                insetChildren={true}
                value={name.value}
                primaryText={name.name}
            />));
        return (
            <div>
                <SelectField
                    hintText="Select a name"
                    fullWidth={true}
                    multiple={true}
                    value={this.state.value}
                    floatingLabelText="Play multiple songs"
                    floatingLabelFixed={true}
                    className={CSS.select}
                    onChange={this.handleChange}
                >
                    {items}
                </SelectField>
                <RaisedButton
                    fullWidth={true}
                    secondary={true}
                    className={CSS.button}
                    label="Play"
                    onClick={this.playSong}
                />
            </div>
        )

    }

    private playSong() {
        this.props.dispatch({
            type: "PLAY_THESE_SONGS",
            payload: {token: this.props.token, playlist: this.state.value}
        })
    }

    private handleChange(event: any, index: any, value: any) {
        this.setState({value})
    }
}

export const LISTCharger = compose(
    connect(() => ({URIS}))
)(ListChargerClass);
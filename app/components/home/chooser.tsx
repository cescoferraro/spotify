import { ARTISTS } from "../../../shared/playlists"
import * as React from "react"
import RaisedButton from "material-ui/RaisedButton"
import * as CSS from "./main.css"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import { isServer } from "../../../store/createStore"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import { API_URL } from "../../../shared/api"
import Subheader from "material-ui/Subheader"

export class Chooser extends React.Component<any, any> {
    private constructor(props) {
        super(props)
        this.state = { value: ARTISTS[0].value }
        this.handleChange = this.handleChange.bind(this)
        this.ShowFeelings = this.ShowFeelings.bind(this)
    }
    public render() {
        return <div className={CSS.hate} >
            <div>
                <Subheader> Select an artist to love/hate</Subheader>
                <SelectField
                    hintText="Select artist"
                    value={this.state.value}
                    fullWidth={true}
                    onChange={this.handleChange}
                    id="sjkdfn"
                >
                    {
                        ARTISTS.map((name) => (
                            <MenuItem
                                key={name.key}
                                insetChildren={true}
                                value={name.value}
                                primaryText={name.name}
                            />))

                    }
                </SelectField>
                <RaisedButton
                    icon={<DashboardIcon />}
                    labelStyle={{ fontSize: "100%" }}
                    secondary={true}
                    fullWidth={true}
                    onClick={this.ShowFeelings(this.state.value, "love")}
                    label="LOVE" />
                <br />
                <br />
                <RaisedButton
                    icon={<DashboardIcon />}
                    labelStyle={{ fontSize: "100%" }}
                    onClick={this.ShowFeelings(this.state.value, "hate")}
                    secondary={true}
                    fullWidth={true}
                    label="HATE" />
            </div>
        </div>
    }
    private handleChange(event, index, value) {
        this.setState({ value })
    }
    private ShowFeelings(id, move) {
        return () => {
            if (!isServer()) {
                window.location.href = API_URL() + "/artist/" + move + "/" + id
            }
        }
    }
}


import { ARTISTS } from "../../../shared/playlists"
import * as React from "react"
import RaisedButton from "material-ui/RaisedButton"
import * as CSS from "./main.css"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import { API_URL } from "../../../shared/api"
import Subheader from "material-ui/Subheader"
import { OfflineToast } from "../../../shared/toastr"

export class Chooser extends React.Component<any, any> {
    private constructor(props) {
        super(props)
        this.state = { value: ARTISTS[0].value }
        this.handleChange = this.handleChange.bind(this)
        this.ShowFeelings = this.ShowFeelings.bind(this)
        this.selects = this.selects.bind(this)
    }
    public render() {
        return (
            <div className={CSS.hate} >
                <Subheader> Select an artist to love/hate</Subheader>
                <SelectField
                    hintText="Select artist"
                    fullWidth={true}
                    value={this.state.value}
                    onChange={this.handleChange}
                    id="sjkdfn"
                >
                    {this.selects()}
                </SelectField>
                <RaisedButton
                    icon={<DashboardIcon />}
                    labelStyle={{ fontSize: "100%" }}
                    secondary={true}
                    fullWidth={true}
                    onClick={this.ShowFeelings(this.state.value, "love")}
                    label="LOVE"
                />
                <div>
                    he
            </div>
                <RaisedButton
                    fullWidth={true}
                    icon={<DashboardIcon />}
                    labelStyle={{ fontSize: "100%" }}
                    onClick={this.ShowFeelings(this.state.value, "hate")}
                    secondary={true}
                    label="HATE"
                />
            </div>
        )
    }
    private selects() {
        return ARTISTS.map((name) => (
            <MenuItem
                key={name.key}
                insetChildren={true}
                value={name.value}
                primaryText={name.name}
            />))
    }

    private handleChange(event, index, value) {
        this.setState({ value })
    }
    private ShowFeelings(id, move) {
        return () => {
            const { Offline } = (window as any)
            if (Offline.state === "up") {
                window.location.href = API_URL() + "/artist/" + move + "/" + id
            } else {
                OfflineToast()
            }
        }
    }
}

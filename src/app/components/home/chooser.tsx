import MenuItem from "material-ui/MenuItem"
import RaisedButton from "material-ui/RaisedButton"
import SelectField from "material-ui/SelectField"
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import * as React from "react"
import {API_URL} from "../../shared/api"
import {ARTISTS} from "../../shared/playlists"
import {OfflineToast} from "../../shared/toastr"

export class Chooser extends React.Component<any, any> {
    private constructor(props: any) {
        super(props);
        this.state = {value: ARTISTS[0].value};
        this.handleChange = this.handleChange.bind(this);
        this.ShowFeelings = this.ShowFeelings.bind(this);
        this.selects = this.selects.bind(this)
    }

    public render() {
        return (
            <div>
                <SelectField
                    hintText="Select artist"
                    floatingLabelText="Select an artist to love/hate"
                    floatingLabelFixed={true}
                    fullWidth={true}
                    value={this.state.value}
                    onChange={this.handleChange}
                    id="sjkdfn"
                >
                    {this.selects()}
                </SelectField>
                <RaisedButton
                    icon={<DashboardIcon/>}
                    labelStyle={{fontSize: "100%"}}
                    secondary={true}
                    fullWidth={true}
                    onClick={this.ShowFeelings(this.state.value, "love")}
                    label="LOVE"
                />
                <RaisedButton
                    fullWidth={true}
                    icon={<DashboardIcon/>}
                    labelStyle={{fontSize: "100%"}}
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

    private handleChange(event: any, index: any, value: any) {
        this.setState({value})
    }

    private ShowFeelings(id: any, move: any) {
        return () => {
            const {Offline} = (window as any);
            if (Offline.state === "up") {
                window.location.href = API_URL() + "/artist/" + move + "/" + id
            } else {
                OfflineToast()
            }
        }
    }
}

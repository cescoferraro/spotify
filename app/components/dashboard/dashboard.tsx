import Subheader from "material-ui/Subheader"
import * as React from "react"
import * as CSS from "./main.css"
import { compose } from "recompose"
import { Following } from "./following"
import { MyPlaylists } from "./playlist"
import { Player } from "../player/player"
import { INFO } from "./info"
import { Plays } from "./changer"
import { Timer } from "./timer"
import { LOADING } from "../loading/index"
import { LISTCharger } from "./listCharger"

export class DashboardComponent extends React.Component<any, any> {
    public render() {
        const { payload } = this.props.location
        const { token } = this.props.location.payload
        return <div>
            <div>
                {
                    payload.code ?
                        <LOADING userAgent={this.props.userAgent} /> :
                        payload.user ?
                            (
                                <div >
                                    <INFO payload={payload} />
                                    <Player {...this.props} />
                                    <div>
                                        <Subheader> Tools </Subheader>
                                        <LISTCharger token={token} />
                                        <Plays token={token} />
                                        <Timer token={token} />
                                    </div>
                                    <br />
                                    <div>
                                        <Subheader> Extra information </Subheader>
                                        <Following token={token} />
                                        <div>
                                            hew
					</div>
                                        <MyPlaylists token={token} />
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                </div>

                            ) :
                            <LOADING userAgent={this.props.userAgent} />
                }
            </div>
        </div>

    }
}

export default compose()(DashboardComponent)

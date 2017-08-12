import * as React from "react"
import * as CSS from "./teste.css"
import { compose } from "recompose"
import { Following } from "./following"
import { MyPlaylists } from "./playlist"
import { Player } from "./player"
import { INFO } from "./info"

export class DashboardComponent extends React.Component<any, any> {
    public render() {
        console.log(this.props)
        const { payload } = this.props.location
        const { token } = this.props.location.payload
        return <div>
            <div>
                {
                    payload.code ?
                        <div >
                            <h2>authenticating</h2>
                        </div> :
                        payload.user ?
                            (
                                <div >
                                    <INFO payload={payload} />
                                    <Following token={token} />
                                    <MyPlaylists token={token} />
                                    <Player token={token} />
                                </div>
                            ) :
                            <div >
                                <h2>no dashboard</h2>
                            </div>
                }
            </div>
        </div>

    }
}

export default compose()(DashboardComponent)

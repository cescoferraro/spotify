import * as React from "react"
import * as CSS from "./teste.css"
import { compose } from "recompose"
import { SPOTIFYProfile } from "./profile"


export class DashboardComponent extends React.Component<any, any> {
    public render() {
        console.log(this.props)
        const { payload } = this.props.location
        return <div>
            <div>
                {payload.code ?
                    (<div className={CSS.container} >
                        <h2>authenticating</h2>
                    </div>) : payload.user ?
                        (<SPOTIFYProfile
                            dispatch={this.props.dispatch}
                            token={this.props.location.payload.token}
                            css={CSS}
                            payload={payload}
                        />) :
                        (<div className={CSS.container} >
                            <h2>no dashboard</h2>
                        </div>)}
            </div>
        </div>

    }
}

export default compose()(DashboardComponent)

import * as React from "react"
import * as CSS from "./css/teste.css"
import { compose } from "recompose"

export class DashboardComponent extends React.Component<any, any> {
    public render() {
        const { payload } = this.props.location
        return payload.code ?
            <div className={CSS.test} >
                <h2>authenticating</h2>
            </div> :
            payload.user ?
                <div className={CSS.test} >
                    <h2>{payload.user.id}</h2>
                    <h2>{payload.user.display_name}</h2>
                    <h2>{payload.user.email}</h2>
                    <h2>{payload.user.href}</h2>
                </div> :
                <div className={CSS.test} >
                    <h2>no dashboard</h2>
                </div>
    }
}

export default compose()(DashboardComponent)

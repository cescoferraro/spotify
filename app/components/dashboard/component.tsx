import * as React from "react"
import { compose } from "recompose"
import { Following } from "../following"
import { MyPlaylists } from "../playlists"
import { Player } from "../player"
import { INFO } from "../profile"
import { LOADING } from "../loading/index"
import * as CSS from "./dashboard.css"
import { Tabs, Tab } from "material-ui/Tabs"
import SwipeableViews from "react-swipeable-views"
import { TOOLS } from "../tools/index"
import { Songs } from "../songs/index"

export class DashboardComponent extends React.Component<any, any> {
    private tabMap = {
        player: 0, songs: 1, playlists: 2, following: 3, tools: 4, profile: 5
    }
    constructor(props) {
        super(props)
        console.log(this.props.songs)
        this.onChange = this.onChange.bind(this)
    }
    public render() {
        const { payload } = this.props.location
        const { token } = this.props.location.payload
        return payload.user ?
            (
                <div className={CSS.container}>
                    <Tabs
                        onChange={this.onChange}
                        className={CSS.tabs}
                        value={this.tabMap[payload.tab]}
                    >
                        <Tab label="⏯" value={0} />
                        <Tab label="🎵" value={1} />
                        <Tab label="🎶" value={2} />
                        <Tab label="🏃" value={3} />
                        <Tab label="🛠" value={4} />
                        <Tab label="ℹ" value={5} />
                    </Tabs>
                    <SwipeableViews
                        id="swipe"
                        onChangeIndex={this.onChange}
                        className={CSS.container}
                        index={this.tabMap[payload.tab]}
                        slideStyle={{ height: "calc( 100vh - 112px )", overflowX: "hidden" }}
                    >
                        <Player {...this.props} />
                        <Songs {...this.props} />
                        <MyPlaylists token={token} />
                        <Following {...this.props} token={token} />
                        <TOOLS token={token} />
                        <INFO payload={payload} />
                    </SwipeableViews>
                </div>
            ) : <LOADING userAgent={this.props.userAgent} />
    }
    private onChange(value) {
        this.props.ROUTER_ACTION(
            "DASHBOARD",
            {
                token: this.props.location.payload.token,
                state: this.props.location.payload.state,
                tab: Object.keys(this.tabMap).find((key) => this.tabMap[key] === value),
                user: this.props.location.payload.user
            }
        )
    }
}

export default compose()(DashboardComponent)

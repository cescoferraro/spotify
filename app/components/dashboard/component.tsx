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

const tabs = {
    player: 0, songs: 1, playlists: 2, following: 3, tools: 4, profile: 5
}

export class DashboardComponent extends React.Component<any, any> {
    private tabMap = {
        player: 0, songs: 1, playlists: 2, following: 3, tools: 4, profile: 5
    }
    constructor(props) {
        super(props)
        console.log(234324)
        this.onChange = this.onChange.bind(this)
    }
    public render() {
        const { token, user, tab } = this.props
        return user ?
            (
                <div className={CSS.container}>
                    <Tabs
                        onChange={this.onChange}
                        className={CSS.tabs}
                        value={this.tabMap[tab]}
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
                        index={this.tabMap[tab]}
                        slideStyle={{ height: "calc( 100vh - 112px )", overflowX: "hidden" }}
                    >
                        <Player {...this.props} />
                        <Songs {...this.props} />
                        <MyPlaylists {...this.props} />
                        {/* <Following {...this.props} /> */}
                        <div>hjksadfb</div>
                        <TOOLS {...this.props} />
                        <INFO {...this.props} />
                    </SwipeableViews>
                </div>
            ) : <LOADING userAgent={this.props.userAgent} />
    }
    private onChange(value) {
        const tab = Object.keys(this.tabMap).find((key) => this.tabMap[key] === value)
        this.props.dispatch({ type: "SET_TAB", payload: tab })
        this.props.ROUTER_ACTION("DASHBOARD", { tab })
    }
}

export default compose()(DashboardComponent)

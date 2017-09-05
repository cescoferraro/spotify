import * as React from "react"
import * as CSS from "./dashboard.css"
import SwipeableViews from "react-swipeable-views"
import { Playlists } from "../playlists"
import { Player } from "../player"
import { INFO } from "../profile"
import { LOADING } from "../loading/index"
import { Tabs, Tab } from "material-ui/Tabs"
import { Tools } from "../tools/index"
import { Songs } from "../songs/index"
import { Following } from "../following/index";

const tabs = {
    player: 0, songs: 1, playlists: 2, following: 3, tools: 4, profile: 5, loading: 6
}

export default class DashboardComponent extends React.Component<any, any> {
    private tabMap = tabs
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    public render() {
        const { user, tab } = this.props
        return user ? (
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
                    <Playlists {...this.props} />
                    <Following {...this.props} />
                    <Tools {...this.props} />
                    <INFO {...this.props} />
                    <LOADING userAgent={this.props.userAgent} />
                </SwipeableViews>
            </div>
        ) : <LOADING userAgent={this.props.userAgent} />
    }
    private onChange(value) {
        const tab = Object.keys(this.tabMap)
            .find((key) => this.tabMap[key] === value)
        const { prev } = this.props.location
        this.props.DISPATCH("DASHBOARD", { tab, prev })
        this.props.DISPATCH("SET_TAB", { tab })
    }
}

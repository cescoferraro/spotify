import {Tab, Tabs} from "material-ui/Tabs"
import * as React from "react"
import SwipeableViews from "react-swipeable-views"
import {compose} from "recompose"
import {LOADING} from "../loading/index"
import {Player} from "../player"
import {Playlists} from "../playlists"
import {INFO} from "../profile"
import {Songs} from "../songs/index"
import {TOOLS} from "../tools/index"
import * as CSS from "./dashboard.css"

const tabs = {
    player: 0, songs: 1, playlists: 2, following: 3, tools: 4, profile: 5
};

export class DashboardComponent extends React.Component<any, any> {
    private tabMap: any = {
        player: 0, songs: 1, playlists: 2, following: 3, tools: 4, profile: 5, loading: 6
    };

    constructor(props: any) {
        super(props);
        console.log(234324);
        this.onChange = this.onChange.bind(this)
    }

    public render() {
        const {token, user, tab} = this.props;
        return user ?
            (
                <div className={CSS.container}>
                    <Tabs
                        onChange={this.onChange}
                        className={CSS.tabs}
                        value={this.tabMap[tab]}
                    >
                        <Tab label="⏯" value={0}/>
                        <Tab label="🎵" value={1}/>
                        <Tab label="🎶" value={2}/>
                        <Tab label="🏃" value={3}/>
                        <Tab label="🛠" value={4}/>
                        <Tab label="ℹ" value={5}/>
                    </Tabs>
                    <SwipeableViews
                        id="swipe"
                        onChangeIndex={this.onChange}
                        className={CSS.container}
                        index={this.tabMap[tab]}
                        slideStyle={{height: "calc( 100vh - 112px )", overflowX: "hidden"}}
                    >
                        <Player {...this.props} />
                        <Songs {...this.props} />
                        <Playlists {...this.props} />
                        {/* <Following {...this.props} /> */}
                        <div>hjksadfb</div>
                        <INFO {...this.props} />
                    </SwipeableViews>
                </div>
            ) : <LOADING userAgent={this.props.userAgent}/>
    }

    private onChange(value: any) {
        const tab = Object.keys(this.tabMap).find((key) => this.tabMap[key] === value);
        this.props.DISPATCH("SET_TAB", tab);
        this.props.ROUTER_ACTION("DASHBOARD", {tab})
    }
}

export default compose()(DashboardComponent)

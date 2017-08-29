import * as React from "react"
import Subheader from "material-ui/Subheader"
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer"
import List from "react-virtualized/dist/commonjs/List"
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import RaisedButton from "material-ui/RaisedButton"
import { API_URL } from "../../../shared/api/index"
import * as CSS from "./playlists.css"
import Avatar from "material-ui/Avatar"
import { List as UIList, ListItem } from "material-ui/List"
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble"
import { bodyUrl } from "../../../shared/ajax"
import { LOADING } from "../loading/index";

export class MyPlaylists extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false,
            playlists: []
        }
        this.getPlaylists = this.getPlaylists.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
    }
    public componentDidMount() { this.getPlaylists() }
    public render() {
        return this.state.playlists.length !== 0 ?
            <div className={CSS.container}>
                <Subheader>Playlists</Subheader>
                <div className={CSS.listWrapper}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={this.state.playlists.length}
                                rowHeight={56}
                                rowRenderer={this.rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            </div>
            :
            <LOADING userAgent={this.props.userAgent} />
    }
    private rowRenderer({ key, index, isScrolling, isVisible, style }) {
        const playlist = this.state.playlists[index]
        return (
            <ListItem
                key={key}
                style={style}
                primaryText={this.state.playlists[index].name}
                leftAvatar={<Avatar src={this.makeSure(playlist)} />}
                rightIcon={<CommunicationChatBubble />}
            />
        )
    }
    private makeSure(artist) {
        return artist.images[0] ? artist.images[0].url :
            "https://google.com/favicon.ico"
    }
    private getPlaylists() {
        Observable.ajax(bodyUrl(API_URL() + "/playlists", this.props.token))
            .map((user) => {
                this.setState({ playlists: user.response })
            }).take(1).subscribe()
    }
}

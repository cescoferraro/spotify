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
import { bodyUrl, AJAX } from "../../../shared/ajax"
import { LOADING } from "../loading/index";

export class MyPlaylists extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.getPlaylists = this.getPlaylists.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
    }

    public componentWillUpdate() {
        if (this.props.playlists.loading && this.props.token !== "") {
            /* this.getPlaylists()*/
            /* this.getMySongs()*/
        }
    }

    public render() {
        return this.props.playlists.data.length !== 0 ?
            <div className={CSS.container}>
                <Subheader>Playlists</Subheader>
                <div className={CSS.listWrapper}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={this.props.playlists.data.length}
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
        const playlist = this.props.playlists.data[index]
        return (
            <ListItem
                key={key}
                style={style}
                primaryText={this.props.playlists.data[index].name}
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
        AJAX("/playlists", this.props.token)
            .map((user) => {
                console.log(user)
                this.props.DISPATCH("SET_PLAYLISTS_LOADING_FILTER", false)
                this.props.DISPATCH("SET_PLAYLISTS", user.response)
            }).take(1).subscribe()
    }
}

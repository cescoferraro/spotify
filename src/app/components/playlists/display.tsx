import FloatingActionButton from 'material-ui/FloatingActionButton';
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import * as React from "react"
import {compose} from "recompose"
import {LOADING} from "../loading"
import {PlaylistsList} from "./list";
import * as CSS from "./playlists.css"

class PlaylistsDisplayClass extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        return this.props.playlists.loading ?
            <LOADING userAgent={this.props.userAgent}/> :
            (
                <div className={CSS.container}>
                    <FloatingActionButton
                        className={CSS.float}
                        onClick={() => {
                            this.props.SET_SONG_VISIBILITY_FILTER_ACTION(
                                !this.props.songs.visibility
                            )
                        }}
                    >
                        <DashboardIcon/>
                    </FloatingActionButton>
                    <PlaylistsList {...this.props} />
                </div>
            )
    }

}

export const PlaylistsDisplay = compose()(PlaylistsDisplayClass);


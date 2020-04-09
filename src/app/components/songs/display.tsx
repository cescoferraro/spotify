import FloatingActionButton from 'material-ui/FloatingActionButton';
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import * as React from "react"
import {connect} from "react-redux"
import {compose} from "recompose"
import {AJAX} from "../../../shared/ajax"
import {LOADING} from "../loading"
import {FilterNavigation, filterSearchSongs} from "./filters"
import {SongsList} from "./list";
import * as CSS from "./song.css"

class SongsDisplayClass extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.info("information songs being created component");
        this.getMySongs = this.getMySongs.bind(this)
    }

    public componentWillUpdate() {
        if (this.props.songs.loading && this.props.token !== "") {
            /* this.getMySongs()*/
        }
    }

    public render() {
        return this.props.songs.loading ?
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
                    <SongsList {...this.props} />
                    <FilterNavigation  {...this.props} />
                </div>
            )
    }

    private getMySongs() {
        console.log(this.props.token);
        AJAX("/songs", this.props.token)
            .map((user) => {
                this.props.dispatch({type: "SET_SONGS", payload: user.response});
                this.props.SET_SONG_LOADING_FILTER_ACTION(false)
            }).take(1).subscribe()
    }
}

export const SongsDisplay = compose(
    connect((state: any) => {
        return ({songs: {...state.songs, data: filterSearchSongs(state)}})
    })
)(SongsDisplayClass);

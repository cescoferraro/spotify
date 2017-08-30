import * as React from "react"
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const recentsIcon = (title) =>
    < FontIcon className="material-icons" > {title}</FontIcon>;
import { createSelector } from 'reselect'
const nearbyIcon = <IconLocationOn />;
import * as CSS from "./song.css"


const getKindFilter = state => { return state.songsFilter.genre }
const getExplicitFilter = state => { return state.songsFilter.explicit }
const getSongs = state => state.songs

export const filterSongsByType = createSelector(
    [getKindFilter, getSongs],
    (visibilityFilter, songs) => {
        switch (visibilityFilter) {
            case '':
                console.log(songs)
                return songs
            default:
                return songs.filter(t => {
                    return t.track.album.album_type === visibilityFilter
                })
        }
    }
)

export const filterExplicitSongs = createSelector(
    [filterSongsByType, getExplicitFilter],
    (songs, explicit) => {
        console.log(explicit)
        return songs.filter((song) => {
            /* if (explicit) { return true }*/
            return (song.track.explicit === explicit)
        })
    }
)


export class KindFilterNavigation extends React.Component<any, any> {
    state = { selectedIndex: 0, };
    select = (index) => this.setState({ selectedIndex: index });
    render() {
        return (
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <BottomNavigationItem
                    icon={recentsIcon("Singles")}
                    onClick={() => {

                        this.props.SET_SONG_GENRE_FILTER_ACTION("single")
                        this.select(0)
                    }}
                />
                <BottomNavigationItem
                    icon={recentsIcon("from Album")}
                    onClick={() => {

                        this.props.SET_SONG_GENRE_FILTER_ACTION("album")
                        this.select(1)
                    }}
                />
                <BottomNavigationItem
                    icon={recentsIcon("All Songs")}
                    onClick={() => {
                        this.props.SET_SONG_GENRE_FILTER_ACTION("")
                        this.select(2)
                    }}
                />
            </BottomNavigation>
        );
    }
}

export class ExplicitFilterNavigation extends React.Component<any, any> {
    state = { selectedIndex: 1, };
    select = (index) => this.setState({ selectedIndex: index });
    render() {
        console.log(this.props)
        return (
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <BottomNavigationItem
                    icon={recentsIcon("Clean")}
                    onClick={() => {
                        console.log(this.props)
                        this.props.SET_SONG_EXPLICIT_FILTER_ACTION(false)
                        this.select(0)
                    }}
                />
                <BottomNavigationItem
                    icon={recentsIcon("Explicit")}
                    onClick={() => {
                        console.log(this.props)
                        this.props.SET_SONG_EXPLICIT_FILTER_ACTION(true)
                        this.select(1)
                    }}
                />
            </BottomNavigation>
        );
    }
}

export const FilterNavigation = (props) => {
    return props.songsFilter.visibility ? (
        <Paper className={CSS.nav} zDepth={1}>
            <KindFilterNavigation {...props} />
            <ExplicitFilterNavigation {...props} />
        </Paper>
    ) : null;
}


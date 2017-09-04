import * as React from "react"
import Subheader from "material-ui/Subheader"
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const recentsIcon = (title) =>
    < FontIcon className="material-icons" > {title}</FontIcon>;
import { createSelector } from 'reselect'
const nearbyIcon = <IconLocationOn />;
import * as CSS from "./song.css"
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
const getKindFilter = state => { return state.songs.genre }
const getExplicitFilter = state => { return state.songs.explicit }
const getSearchFilter = state => { return state.songs.search }
const getSongs = state => state.songs.data

export const filterSongsByType = createSelector(
    [getKindFilter, getSongs],
    (visibilityFilter, songs) => {
        switch (visibilityFilter) {
            case '':
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
        return songs.filter((song) => {
            /* if (explicit) { return true }*/
            return (song.track.explicit === explicit)
        })
    }
)

export const filterSearchSongs = createSelector(
    [filterExplicitSongs, getSearchFilter],
    (songs, search) => {
        return songs.filter((song) => {
            /* if (explicit) { return true }*/
            return song.track.name.includes(search)
        })
    }
)
const kindFactory = (kind) => {
    let genre
    switch (kind) {
        case "":
            genre = 2
            break
        case "single":
            genre = 0
            break
        case "album":
            genre = 1
            break
    }
    return genre
}

export const KindFilterNavigation = (props) => {
    const genre = kindFactory(props.songs.genre)
    return (
        <BottomNavigation selectedIndex={genre}>
            <BottomNavigationItem
                icon={recentsIcon("Singles")}
                onClick={() => {
                    props.DISPATCH("SET_SONG_GENRE_FILTER", "single")
                }}
            />
            <BottomNavigationItem
                icon={recentsIcon("Albums")}
                onClick={() => {
                    props.DISPATCH("SET_SONG_GENRE_FILTER", "album")
                }}
            />
            <BottomNavigationItem
                icon={recentsIcon("All")}
                onClick={() => {
                    props.DISPATCH("SET_SONG_GENRE_FILTER", "")
                }}
            />
        </BottomNavigation>
    );
}

export const ExplicitFilterNavigation = (props) => {
    const hey = props.songs.explicit ? 1 : 0
    return (
        <BottomNavigation selectedIndex={hey}>
            <BottomNavigationItem
                icon={recentsIcon("Clean")}
                onClick={() => {
                    console.log(props)
                    props.DISPATCH("SET_SONG_EXPLICIT_FILTER_ACTION", false)
                }}
            />
            <BottomNavigationItem
                icon={recentsIcon("Explicit")}
                onClick={() => {
                    console.log(props)
                    props.DISPATCH("SET_SONG_EXPLICIT_FILTER_ACTION", true)
                }}
            />
        </BottomNavigation>
    );
}

export const FilterNavigation = (props) => {
    const handleClose = () => {
        props.DISPATCH("SET_SONG_VISIBILITY_FILTER", !props.songs.visibility)
    }
    const actions = [
        <FlatButton
            label="Close"
            primary={true}
            onClick={handleClose}
        />
    ];
    return (
        <Dialog
            title="Song Filters"
            actions={actions}
            modal={false}
            contentClassName={CSS.dialog}
            open={props.songs.visibility}
            onRequestClose={handleClose}
        >
            <Subheader>Kind</Subheader>
            <KindFilterNavigation {...props} />
            <Subheader>Clean or Explicit?</Subheader>
            <ExplicitFilterNavigation {...props} />
            <Subheader>Search for keywork</Subheader>
            <TextField
                onChange={(event, newValue) => {
                    props.DISPATCH("SET_SONG_SEARCH_FILTER", newValue)
                }}
                value={props.songs.search}
                fullWidth={true}
                inputStyle={{ textAlign: 'center' }}
                hintStyle={{ textAlign: 'center' }}
            />
        </Dialog>
    )
}


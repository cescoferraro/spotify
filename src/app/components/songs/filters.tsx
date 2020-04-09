import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Dialog from "material-ui/Dialog";
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from "material-ui/Subheader"
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import TextField from 'material-ui/TextField';
import * as React from "react"
import {createSelector} from 'reselect'
import * as CSS from "./song.css"

const recentsIcon = (title: any) =>
    < FontIcon className="material-icons"> {title}</FontIcon>;

const nearbyIcon = <IconLocationOn/>;

const getKindFilter = (state: any) => {
    return state.songs.genre
};
const getExplicitFilter = (state: any) => {
    return state.songs.explicit
};
const getSearchFilter = (state: any) => {
    return state.songs.search
};
const getSongs = (state: any) => state.songs.data;

export const filterSongsByType = createSelector(
    [getKindFilter, getSongs],
    (visibilityFilter, songs) => {
        switch (visibilityFilter) {
            case '':
                return songs;
            default:
                return songs.filter((t: any) => {
                    return t.track.album.album_type === visibilityFilter
                })
        }
    }
);

export const filterExplicitSongs = createSelector(
    [filterSongsByType, getExplicitFilter],
    (songs, explicit) => {
        return songs.filter((song: any) => {
            /* if (explicit) { return true }*/
            return (song.track.explicit === explicit)
        })
    }
);

export const filterSearchSongs = createSelector(
    [filterExplicitSongs, getSearchFilter],
    (songs, search) => {
        return songs.filter((song: any) => {
            /* if (explicit) { return true }*/
            return song.track.name.includes(search)
        })
    }
);
const kindFactory = (kind: any) => {
    let genre;
    switch (kind) {
        case "":
            genre = 2;
            break;
        case "single":
            genre = 0;
            break;
        case "album":
            genre = 1;
            break
    }
    return genre
};

export const KindFilterNavigation = (props: any) => {
    const genre = kindFactory(props.songs.genre);
    return (
        <BottomNavigation selectedIndex={genre}>
            <BottomNavigationItem
                icon={recentsIcon("Singles")}
                onClick={() => {
                    props.SET_SONG_GENRE_FILTER_ACTION("single")
                }}
            />
            <BottomNavigationItem
                icon={recentsIcon("Albums")}
                onClick={() => {
                    props.SET_SONG_GENRE_FILTER_ACTION("album")
                }}
            />
            <BottomNavigationItem
                icon={recentsIcon("All")}
                onClick={() => {
                    props.SET_SONG_GENRE_FILTER_ACTION("")
                }}
            />
        </BottomNavigation>
    );
};

export const ExplicitFilterNavigation = (props: any) => {
    const hey = props.songs.explicit ? 1 : 0;
    return (
        <BottomNavigation selectedIndex={hey}>
            <BottomNavigationItem
                icon={recentsIcon("Clean")}
                onClick={() => {
                    console.log(props);
                    props.SET_SONG_EXPLICIT_FILTER_ACTION(false)
                }}
            />
            <BottomNavigationItem
                icon={recentsIcon("Explicit")}
                onClick={() => {
                    console.log(props);
                    props.SET_SONG_EXPLICIT_FILTER_ACTION(true)
                }}
            />
        </BottomNavigation>
    );
};

export const FilterNavigation = (props: any) => {
    const handleClose = () => {
        props.SET_SONG_VISIBILITY_FILTER_ACTION(
            !props.songs.visibility
        )
    };
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
                    props.SET_SONG_SEARCH_FILTER_ACTION(newValue)
                }}
                value={props.songs.search}
                fullWidth={true}
                inputStyle={{textAlign: 'center'}}
                hintStyle={{textAlign: 'center'}}
            />
        </Dialog>
    )
};


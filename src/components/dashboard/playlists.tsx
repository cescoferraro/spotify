import * as React from "react";
import {Observable} from "rx-lite-dom";
import {Grid, Cell} from "radium-grid";
import {connect} from "react-redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Playlist} from "../../reducers/dashboard";
const size = {
    width: '100%',
    height: 300,
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'
import SpotifyPlayer from 'react-spotify-player';

export const PlaylistsComponent = ({playlists}) => {
    return (<div>
        <h3>Playlists:</h3>
        {playlists.map((playlist: Playlist) => {
            console.log(playlist)
            return (<SpotifyPlayer
                key={Math.random()}
                uri={playlist.uri}
                size={size}
                view={view}
                theme={theme}
            />)
        })}
    </div>)
};


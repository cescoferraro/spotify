import * as React from "react";
import {Observable} from "rx-dom";
import {Grid, Cell} from "radium-grid";
import {connect} from "react-redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Playlist} from "../../reducers/dashboard";

export const PlaylistsComponent = ({playlists}) => {
    return (<div>
        <h3>Playlists:</h3>
        {playlists.map((playlist: Playlist) => {
            return (<CardHeader key={Math.random()}
                                title={playlist.id}
                                subtitle={playlist.name}
                                avatar={playlist.images[0].url}
                                width="1"


            />)
        })}
    </div>)
};


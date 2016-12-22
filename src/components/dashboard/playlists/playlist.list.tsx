import * as MUI from "muicss/react";
import { Button, Row, Container, Col } from "muicss/react";
import * as React from "react";
import Playlist from "./playlist";

interface PlaylistsProps {
    playlists: Array<{
        id: string;
        name: string;
        owner: {id: string};
        tracks: {total: number};
        images: Array<{url: string}>;
        external_urls: {spotify: string};
    }>;
}
export default class Playlists extends React.Component<PlaylistsProps, any> {


    render() {
        return (<div>
            <h2>Playlists</h2>
            <MUI.Divider/>
            {this.props.playlists.map(
                (playlist) => {
                    return (<Playlist key={playlist.id} info={playlist}/>);
                }
            )}
        </div>);
    }
}

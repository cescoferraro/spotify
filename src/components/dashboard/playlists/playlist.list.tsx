import {Button, Row, Container, Col} from "muicss/react";
import * as React from "react";
import Playlist from "./playlist";
import Divider from "material-ui/Divider";
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
export default class PlaylistList extends React.Component<PlaylistsProps, any> {


    render() {
        return (<div>
            <h2>Playlists</h2>
            <Divider/>
            {this.props.playlists.map(
                (playlist) => {
                    return (<Playlist key={playlist.id} info={playlist}/>);
                }
            )}
        </div>);
    }
}

import * as React from "react";
import {Observable} from "rx-dom";
import Utils from "../../shared/utils";
import {Grid, Cell} from "radium-grid";
import {connect} from "react-redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Track, Artist} from "../../reducers/dashboard";


export const RecommendationsComponent = ({recommendations}) => {
    return (
        <div>
            <h3>Recommendations:</h3>
            {recommendations.tracks.map((track: Track) => {
                console.log();
                let artistsName = "";
                track.artists.map((artist: Artist, index) => {

                    artistsName = artistsName + artist.name;
                    if (track.artists.length !== index + 1) {

                        artistsName = artistsName + " & ";
                    }

                });


                return (<CardHeader
                    onClick={()=>{
                                                    if (!Utils.isServer()){
                                                        window.open(track.preview_url, "_blank").focus();}
                                                }}
                    key={Math.random()}
                    title={artistsName}
                    subtitle={track.name}
                />)
            })}
        </div>
    )
};

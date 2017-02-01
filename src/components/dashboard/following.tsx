import * as React from "react";
import {Observable} from "rx-lite-dom";
import {Grid, Cell} from "radium-grid";
import {StyleRoot} from "radium";
import {connect} from "react-redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import withStyles from "isomorphic-style-loader/lib/withStyles";
let ss = require('./following.pcss');
const style = {margin: 5};
export const FollowingComponent = withStyles(ss)(({following}) => {
    if (following !== null && following.items.length > 0) {
        return (<div >
            <h3>Following:</h3>
            {following.items.map((artist) => {
                return (<CardHeader
                    key={Math.random()}
                    title={artist.id}
                    subtitle={artist.name}
                    avatar={artist.images[0].url}
                    width="1"/>)
            })}
        </div>)
    }
    return <div><h3>You are not following anyone.</h3></div>
});


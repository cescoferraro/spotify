import { Button, Row, Container, Col } from "muicss/react";
import * as React from "react";
import * as moment from "moment";
import PlaylistStyle from "./playlist.style";
import * as Rx from "rx-dom";
import Utils from "./utils";

interface PlaylistProps {
    info: {id: string,
        name: string,
        owner: {id: string},
        tracks: {total: number},
        images: Array<{url: string}>,
        external_urls: {spotify: string}}
}

export default class Playlist extends React.Component<PlaylistProps,any> {
    showTracks: boolean = false;

    constructor(props) {
        super(props);
        this.getTracks();

        this.state = {items: [], images: [ {url: "hello"} ]};
    }

    getTracks() {
        if (this.props.info.name != "initial") {
            Rx.DOM.get("/tracks/" + this.props.info.owner.id + "/" + this.props.info.id + "/" + Utils.GetCode("code"))
                .subscribe(
                    (xhr) => {
                        this.state = JSON.parse(xhr.response);
                        this.setState(this.state);
                    })
        }
    }

    toogleShowTracks() {
        this.showTracks = !this.showTracks;
        this.setState(this.state);
    }


    render() {
        console.log(this.props.info);
        let img;
        if (this.props.info.images[ 0 ] != null) {
            img = <img className="mui--pull-right" style={PlaylistStyle.stylee} src={this.props.info.images[0].url}
                       alt=""/>
        } else {
            img = <img className="mui--pull-right" style={PlaylistStyle.stylee} src="https:\/\/goo.gl/UO3J6T" alt=""/>
        }

        return (<div>
            <Row style={PlaylistStyle.stylee}>
                <Col md="2">
                    {img}
                </Col>
                <Col style={PlaylistStyle.stylee} md="5">
                    <p>{this.showTracks} </p>
                    <p><a href={this.props.info.external_urls.spotify}>{this.props.info.name}</a></p>
                    <p>{this.props.info.tracks.total} Tracks</p>
                </Col>

                <Col style={PlaylistStyle.stylee} md="5">
                    <Button style={PlaylistStyle.full} onClick={this.toogleShowTracks.bind(this)}> Show
                        Tracklist</Button>
                </Col>
            </Row>
            {this.showTracks ?
                <Row>
                    <Col md="12">
                        <Row>
                            <Container style={PlaylistStyle.padrao}>
                                <h4 style={PlaylistStyle.middle}>Tracks</h4>

                            </Container>

                        </Row>

                        <Row>
                            {this.state.items.map((data, i) => {
                                let space = " - ";
                                return <Container style={PlaylistStyle.padrao} key={i}>
                                    <p style={PlaylistStyle.middle}>
                                        {data.track.artists.map((artist, index) => {
                                            let spacer = "";
                                            if (index + 1 != data.track.artists.length) {
                                                spacer = " & ";
                                            }
                                            return (artist.name + spacer)
                                        })}

                                        {space} {data.track.name} {space} {moment.utc(data.track.duration_ms).format("mm:ss")}
                                    </p>

                                </Container>
                            })}
                        </Row>
                    </Col>
                </Row> : null}
        </div>)
    }
}

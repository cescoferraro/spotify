import * as React from "react";
import * as moment from "moment";
import * as Rx from "rx-dom";
import Utils from "../../../shared/utils";
import * as cx from "classnames";
declare let require: any;
let style = require("./playlist.pcss");
let Image1 = require("-!babel-loader!svg-react-loader!./kiwi.svg");
import Button from "material-ui/RaisedButton";

interface PlaylistProps {
    info: {
        id: string;
        name: string;
        owner: {id: string};
        tracks: {total: number};
        images: Array<{url: string}>;
        external_urls: {spotify: string};
    };
}

export default class Playlist extends React.Component<PlaylistProps, any> {
    showTracks: boolean = false;

    constructor(props) {
        super(props);
        this.getTracks();
        this.state = {
            items: [],
            images: [ {url: "hello"} ]
        };
    }

    getTracks() {
        if (this.props.info.name !== "initial") {
            Rx.DOM.get("/tracks/" + this.props.info.owner.id + "/" + this.props.info.id + "/" + Utils.GetCode("code"))
                .subscribe(
                    (xhr) => {
                        this.state = JSON.parse(xhr.response);
                        this.setState(this.state);
                    });
        }
    }

    toogleShowTracks() {
        this.showTracks = !this.showTracks;
        this.setState(this.state);
    }


    render() {
        return (<div >


            <div className={style.flex}>
                <div className={cx(style.left,style.aside)}>
                    <img className={style.image}
                         src={this.props.info.images[ 0 ] !== null ? this.props.info.images[0].url : "https:\/\/goo.gl/UO3J6T"}
                         alt=""/>
                </div>
                <div className={style.center}>
                    <div className={style.align}>
                        <p>
                            <a href={this.props.info.external_urls.spotify}>
                                {this.props.info.name}
                            </a>
                            <i> | {this.props.info.tracks.total} Tracks</i>

                        </p>
                    </div>
                </div>
                <div className={cx(style.buttonSide,style.aside)}>
                    <Button className={cx(style.button)}
                            onClick={this.toogleShowTracks.bind(this)}>
                        <Image1 className={style.svg}/>
                    </Button>
                </div>


            </div>


            {this.showTracks ?
                <div>

                    <h4 >Tracks</h4>


                    {this.state.items.map((data, i) => {
                        let space = " - ";
                        return (<div key={i}>
                            <p >
                                {data.track.artists.map((artist, index) => {
                                    let spacer = "";
                                    if (index + 1 !== data.track.artists.length) {
                                        spacer = " & ";
                                    }
                                    return (artist.name + spacer);
                                })}

                                {space} {data.track.name} {space} {moment.utc(data.track.duration_ms).format("mm:ss")}
                            </p>

                        </div>);
                    })}

                </div> : null}
        </div>);
    }
}

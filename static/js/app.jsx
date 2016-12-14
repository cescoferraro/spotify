/**
 * Created by cescoferraro on 12/6/16.
 */
var Appbar = mui.react.Appbar,
    Button = mui.react.Button,
    Row = mui.react.Row,
    Divider = mui.react.Divider,
    Col = mui.react.Col,
    Container = mui.react.Container;
var AppShell = React.createClass({
    version: '{{.VERSION }}',
    render: function () {
        var content
        var logout
        var ALIGNMIDDLE = {verticalAlign: 'middle'};

        var bar = {backgroundColor: 'black'};
        var s2 = {textAlign: 'right'};
        var s3 = {textAlign: 'left'};
        var logo = {
            height: 'auto',
            width: '10%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2000px-Spotify_logo_without_text.svg.png)'
        };
        var hasCode = eval("{{if .Code}}true{{else}}false{{end}}")
        if (!hasCode) {
            content = <Login/>
        } else {
            logout = <Button onClick={() => {
                window.location.href = window.location.origin
            }} className="mui--appbar-height" style={s2}>LOG-OUT</Button>
            content = <Dashboard/>

        }
        return <div>
        <Appbar style={bar}>
            <table width="100%">
            <tbody>
            <tr style={ALIGNMIDDLE}>
            <td className="mui--appbar-height" style={logo}>
            </td>
            <td className="mui--appbar-height" style={s3}>
            API TESTER v{this.version}

        </td>
        <td className="mui--appbar-height" style={s2}>
            {logout}</td>
            </tr>
            </tbody>
            </table>
            </Appbar>
            {content}
            </div>
    }
});
var Picture = React.createClass({

    propTypes: {
        image: React.PropTypes.string
    },
    render: function () {
        var divStyle = {
            height: '300px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(' + this.props.image + ')'
        };
        return <Row style={divStyle}> </Row>
    }
});
var Login = React.createClass({
    signup: function () {
        window.location.href = "{{.AuthURL}}";
    },
    render: function () {
        var ButtonStyle = {
            height: '150px',
            width: '500px',
            alignSelf: 'center',
            backgroundColor: '#6AE368'

        };
        var ContainerStyle = {
            display: 'flex',
            height: '90vh',
            justifyContent: 'center'
        };
        var logo = {
            height: '100px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(static/images/spotify_logo.png)'
        };
        var textStyle = {
            fontSize: 'x-large',
            alignSelf: 'center',
            position: 'absolute',
            fontSize: '27px',
            color: 'black'
        };
        var flex = {
            display: 'flex',
            height: '100px'
        };
        return (<Container style={ContainerStyle}>

            <Button variant="raised" style={ButtonStyle} size="large" color="accent" onClick={this.signup}>
        <Row>
        <Col md="5" style={flex}>
            <p style={textStyle} className="mui--pull-right">Log in with </p>
        </Col>
        <Col md="7" style={logo}>

            </Col>
            </Row>

            </Button>
            </Container>);
    },
});
var Dashboard = React.createClass({
    getCode: (name) => {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    },
    code: "",
    updateFollowingState: function () {
        Rx.DOM.get("/following/" + this.code)
            .subscribe(
                (xhr) => {
                    this.state.following = JSON.parse(xhr.response)
                    this.replaceState(this.state);
                })
    },
    updatePLaylistState: function () {
        Rx.DOM.get("/playlist/" + this.code)
            .subscribe(
                (xhr) => {
                    this.state.playlist = [{name: "initial", id: "e3d", owner: {id: ""}}]
                    this.replaceState(this.state);
                    this.state.playlist = JSON.parse(xhr.response)
                    this.replaceState(this.state);
                });
    },
    updateProfileState: function () {
        console.log(this.code);
        Rx.DOM.get("/me/" + this.code)
            .subscribe(
                (xhr) => {
                    this.state.profile = JSON.parse(xhr.response)
                    this.replaceState(this.state);
                });

    },

    getInitialState: function () {
        console.log("getInitialState call");

        this.code = this.getCode("code")
        this.updatePLaylistState()
        this.updateFollowingState()
        this.updateProfileState()

        return {
            playlist: [{name: "initial", id: "3344", owner: {id: "sdfsdfsd"}}],
            following: {items: []},
            profile: {
                images: [{url: "http:\/\/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png"}],
                id: "initial",
                email: "guest@guest.com"
            }
        };
    },
    render: function () {
        var full = {width: '100%'}
        var divStyle = {
            height: '300px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(' + this.state.profile.images[0].url + ')'
        }
        return <div>
        <Row>
        <Col md="4">
            <Container>
            <Picture image={this.state.profile.images[0].url}/>

        <Controls
        code={this.code}
        profile={this.state.profile}
        playlist={this.state.playlist}
        updateProfileState={this.updateProfileState}
        updatePLaylistState={this.updatePLaylistState}
        updateFollowingState={this.updateFollowingState}/>
        </Container>
        </Col>
        <Col md="8">
            <Container>
            <Profile
        profile={this.state.profile}/>
        <Following following={this.state.following}/>

        <Playlists code={this.code} playlists={this.state.playlist}></Playlists>
        </Container>
        </Col>
        </Row>

        </div>


        ;
    }
});
var Controls = React.createClass({

    PlaylistCall: function (action, user, playlist) {
        console.log(user, playlist)
        Rx.DOM.get("/playlist/" + action + "/" + user + "/" + playlist + "/" + this.props.code)
            .subscribe(this.props.updatePLaylistState)
    },
    addGuimeTrack2Playlist: function () {
        this.props.playlist.map(
            (data, index) => {
                if (data.name == "Starred") {
                    Rx.DOM.get("/tracks/add/" + data.owner.id + "/" + data.id + "/7AD7hNwGOOSRe33QtnyprD/" + this.props.code)
                        .subscribe(this.props.updatePLaylistState)
                }
                return
            })
    },
    addGuimeTrack2AllPlaylist: function () {
        this.props.playlist.map(
            (data, index) => {
                Rx.DOM.get("/tracks/add/" + this.props.profile.id + "/" + this.props.playlist[index].id + "/7AD7hNwGOOSRe33QtnyprD/" + this.props.code)
                    .subscribe(this.props.updatePLaylistState)
            }
        )

    },
    FollowCall: function (action, artist) {
        Rx.DOM.get("/" + action + "/" + artist + "/" + this.props.code)
            .subscribe(this.props.updateFollowingState)
    },
    propTypes: {
        code: React.PropTypes.string,
        playlist: React.PropTypes.array,
        profile: React.PropTypes.object,
        updatePLaylistState: React.PropTypes.func,
        updateProfileState: React.PropTypes.func,
        updateFollowingState: React.PropTypes.func
    },
    render: function () {
        var full = {
            width: '100%',
            color: 'black',
            backgroundColor: '#6AE368'
        };


        return (
            <div>
            <Row>
            <Button
        onClick={this.PlaylistCall.bind(this, "add", "12186321310", "1aOShUzf52UXuPAFSZ4BDC")}
        style={full} color="danger">Add
        Random
        Playlist</Button>
        </Row>
        <Row>
        <Button style={full} color="danger"
        onClick={this.PlaylistCall.bind(this, "remove", "12186321310", "1aOShUzf52UXuPAFSZ4BDC")}>Remove
        Random
        Playlist</Button>
        </Row>
        <Row>
        <Button style={full} color="danger" onClick={this.addGuimeTrack2Playlist}>Add Guimé Song
        to
        Playlist</Button>
        </Row>
        <Row>
        <Button style={full} color="danger" onClick={this.addGuimeTrack2AllPlaylist}>Add Guimé
        Song to all Playlist</Button>
        </Row>
        <Row>
        <Button style={full} color="danger"
        onClick={this.FollowCall.bind(this, "unfollow", "3TVXtAsR1Inumwj472S9r4")}>Unfollow
        Drake</Button>
        </Row>
        <Row>
        <Button style={full} color="danger"
        onClick={this.FollowCall.bind(this, "unfollow", "3ge4xOaKvWfhRwgx0Rldov")}>Unfollow
        Guimé</Button>
        </Row>
        <Row>
        <Button style={full} color="danger"
        onClick={this.FollowCall.bind(this, "follow", "3TVXtAsR1Inumwj472S9r4")}>Follow
        Drake</Button>
        </Row>
        <Row>
        <Button style={full} color="danger"
        onClick={this.FollowCall.bind(this, "follow", "3ge4xOaKvWfhRwgx0Rldov")}>Follow
        Guimé</Button>
        </Row>
        <Row>
        <Button style={full} color="danger" onClick={() => {
            this.props.updateFollowingState();
            this.props.updatePLaylistState();
            this.props.updateProfileState();

        }}> Refresh</Button>
        </Row>
        </div>
        );
    },

});
var Profile = React.createClass({

    propTypes: {
        profile: React.PropTypes.object,
    },


    render: function () {
        return <div>
        <h2>Profile:</h2>
        <Divider/>
        <h2>ID: {this.props.profile.id}</h2>
        <h2>Email: {this.props.profile.email}</h2>
        </div>
    }
});
var Following = React.createClass({
    propTypes: {
        following: React.PropTypes.object
    },
    render: function () {
        return <div>
        <h2>Following</h2>
        <Divider/>
        <ul>
        {this.props.following.items.map(
            (artist, index) => {
                console.log(artist);
                return <Container key={index}>

                    <Row>
                    <Col md="3" >
                    <img   src={artist.images[0].url} alt=""/>
                    </Col>
                    <Col md="9" >
                    {artist.name} {artist.Followers.total}
                </Col>
                </Row>

                </Container>
            }
        )}

        </ul>
        </div>
    }
});
var Playlists = React.createClass({
    propTypes: {
        playlists: React.PropTypes.array,
        code: React.PropTypes.string
    },
    render: function () {
        return <div>
        <h2>Playlists</h2>
        <Divider/>
        {this.props.playlists.map(
            (playlist) => {
                console.log(playlist);
                return <Playlist
                code={this.props.code}
                key={playlist.id} info={playlist}/>
            }
        )}
        </div>
    }
});
var Playlist = React.createClass({
    propTypes: {
        info: React.PropTypes.object,
        code: React.PropTypes.string
    },
    updateState: function () {
        if (this.props.info.name != "initial") {
            console.log("tentado atualizar");
            Rx.DOM.get("/tracks/" + this.props.info.owner.id + "/" + this.props.info.id + "/" + this.props.code)
                .subscribe(
                    (xhr) => {
                        this.state = JSON.parse(xhr.response);
                        console.log(this.state);
                        this.replaceState(this.state);
                    })
        }


    },
    getInitialState: function () {
        console.log("init playlist");
        this.updateState();
        return {items: []};
    },
    render: function () {
        return <div>
        <h4>{this.props.info.name}</h4>
        <ul>
        {this.state.items.map((data, i) => {
            return <li key={i}>{data.track.name}</li>
        })}
        </ul>
        </div>
    }
});

ReactDOM.render(<AppShell />, document.getElementById('container'));
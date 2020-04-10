import RaisedButton from "material-ui/RaisedButton";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import * as React from "react"
import {connect} from "react-redux"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {compose} from "recompose"
import {API_URL} from "./shared/api";
import {APP_ACTIONS} from "./store/actions"


export const AppRouter = compose(
    connect(({id, location, drawer, token, player, artist, songs, user, tab, playlists}: any) =>
        ({id, location, drawer, token, player, artist, songs, user, tab, playlists}), APP_ACTIONS)
)((props: any) => {
    console.log(props);
    const login = () => {
        window.location.href = API_URL() + "/login";
    };
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/auth">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/auth">
                        <h2>abour</h2>
                    </Route>
                    <Route path="/users">
                        <h2>users</h2>
                    </Route>
                    <Route path="/">
                        <RaisedButton
                            onClick={login}
                            icon={<DashboardIcon/>}
                            labelStyle={{fontSize: "100%"}}
                            secondary={true}
                            fullWidth={true}
                            label="Dashboard"
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
});

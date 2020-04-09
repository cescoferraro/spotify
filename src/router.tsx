import * as React from "react"
import {connect} from "react-redux"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {compose} from "recompose"
import {AuthComponent} from "./new/auth";
import {Auth} from "./new/auth_store";
import {HomeComponent} from "./new/home";
import {APP_ACTIONS} from "./store/actions"
const auth = new Auth ();

export const AppRouter = compose(
    connect(({id, location, drawer, token, player, artist, songs, user, tab, playlists}: any) =>
        ({id, location, drawer, token, player, artist, songs, user, tab, playlists}), APP_ACTIONS)
)((props: any) => {
    console.log(props);
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
                    <Route  path="/auth">
                        <AuthComponent auth={auth}/>
                    </Route>
                    <Route path="/users">
                        <h2>users</h2>
                    </Route>
                    <Route path="/">
                        <HomeComponent auth={auth}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
});

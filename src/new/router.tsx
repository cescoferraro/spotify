import * as React from "react"
import {connect} from "react-redux"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {compose} from "recompose"
import {AuthComponent} from "./auth";
import {Auth} from "./auth_store";
import {DashboardComponent} from "./dashboard";
import {HomeComponent} from "./home";
import {APP_ACTIONS} from "../app/store/actions"

const auth = new Auth();

export const AppRouter = compose(
    // connect(({id, location, drawer, token, player, artist, songs, user, tab, playlists}: any) =>
    //     ({id, location, drawer, token, player, artist, songs, user, tab, playlists}), APP_ACTIONS)
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
                            <Link to="/dashboard">Users</Link>
                        </li>
                    </ul>
                </nav>
                <Route path="/auth">
                    <AuthComponent auth={auth}/>
                </Route>
                <Route path="/dashboard">
                    <DashboardComponent auth={auth}/>
                </Route>
                <Route path="/" exact={true}>
                    <HomeComponent auth={auth}/>
                </Route>
            </div>
        </Router>
    );
});

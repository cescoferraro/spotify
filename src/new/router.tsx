import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import DashboardIcon from "material-ui/svg-icons/action/dashboard"
import * as React from "react"
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import {AuthComponent} from "./auth";
import {Auth} from "./auth_store";
import {DashboardComponent} from "./dashboard";
import {HomeComponent} from "./home";

const auth = new Auth();

const AppBarSpotify = withRouter((props: any) => {
  return (
    <AppBar
      title={"Material Spotify"}
      iconElementRight={(<IconButton><DashboardIcon/></IconButton>)}
      onLeftIconButtonClick={() => {

      }}
      onTitleClick={() => {
        props.history.push("/")
      }}
    />
  );
});

export const AppRouter = (
  (props: {}) => {
    console.log(props);
    return (
      <Router>
        <AppBarSpotify
        />
        <Route path="/auth">
          <AuthComponent auth={auth}/>
        </Route>
        <Route path="/dashboard">
          <DashboardComponent auth={auth}/>
        </Route>
        <Route path="/" exact={true}>
          <HomeComponent auth={auth}/>
        </Route>
      </Router>
    );
  });

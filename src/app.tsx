import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react"
import {BrowserRouter as Router} from "react-router-dom";
import {RoutesComponent} from "./pages/routes";
import {Auth} from "./store/auth_store";

const auth = new Auth();

export const App = () => {
  return (
    <MuiThemeProvider>
      <Router>
        <RoutesComponent auth={auth}/>
      </Router>
    </MuiThemeProvider>
  );
};



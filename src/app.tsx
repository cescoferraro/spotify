import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import * as React from "react"
import {BrowserRouter as Router} from "react-router-dom";
import {RoutesComponent} from "./pages/routes";
import {Auth} from "./store/auth_store";
import {Player} from "./store/player_store";

const auth = new Auth();
const player = new Player();

export const App = () => {
  const theme = createMuiTheme((
    {
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1960
        },
      }
    }
  ));
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RoutesComponent player={player} auth={auth}/>
      </Router>
    </ThemeProvider>
  );
};



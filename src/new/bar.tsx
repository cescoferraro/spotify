import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import * as React from "react";
import {withRouter} from "react-router-dom";

export const AppBarSpotify = withRouter((props: any) => {
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

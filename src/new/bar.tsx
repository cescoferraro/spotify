import AppBar from "material-ui/AppBar";
import * as React from "react";
import {useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Auth} from "../store/auth_store";

export const AppBarSpotify = withRouter((props: RouteComponentProps<any> & { auth: Auth }) => {
  return (
    <AppBar
      title={"Material Spotify"}
      showMenuIconButton={false}
      onTitleClick={() => {
        props.history.push("/")
      }}
    />
  );
});

import RaisedButton from "material-ui/RaisedButton";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import * as React from "react";
import {API_URL} from "../app/shared/api";

export const HomeComponent = (props: any) => {
  const login = () => {
    window.location.href = API_URL() + "/login";
  };
  return <RaisedButton
    onClick={login}
    icon={<DashboardIcon/>}
    labelStyle={{fontSize: "100%"}}
    secondary={true}
    fullWidth={true}
    label="Dashboard"
  />
};

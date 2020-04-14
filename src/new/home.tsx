import {gql} from "@apollo/client";
import RaisedButton from "material-ui/RaisedButton";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import * as React from "react";
import {ChildProps, graphql} from "react-apollo";
import {HomeComponentQuery} from "../types/HomeComponentQuery";
import {Auth} from "./auth_store";

type HomeComponentProps = ChildProps<{ auth: Auth }, HomeComponentQuery>;

export const HomeComponent = graphql<HomeComponentProps>
(gql`query HomeComponentQuery  { login } `)(
  ({data}: HomeComponentProps) => {
    if (data && !data.loading && data.login) {
      return (
        <RaisedButton
          onClick={() => window.location.href = data?.login as string}
          icon={<DashboardIcon/>}
          secondary={true}
          label="Dashboard"
        />
      );
    }
    return null;
  }
);


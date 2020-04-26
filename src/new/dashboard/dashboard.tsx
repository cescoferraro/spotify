import Button from "material-ui/RaisedButton";
import * as React from "react";
import {ChildProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../../store/auth_store";
import {PlayerComponentQuery} from "../../types/PlayerComponentQuery";
import {ActualPalyer} from "./player";
import {query} from "./query";

export type PlayerProps = ChildProps<{ auth: Auth } & RouteComponentProps, PlayerComponentQuery>;

const PlayerCompoennt = ({data, auth, history}: PlayerProps) => {
  console.log(data?.mySongs)
  const notListeniing = data?.error?.message.includes("204");
  return (
    <div style={{padding: 20, width: "100vw"}}>
      s
      {(data?.error && !notListeniing) ?
        <div>Error</div> :
        <p style={{color: "white", width: "calc( 100vw - 40px )", overflowWrap: "break-word"}}>{auth.token}</p>
      }
      <Button
        style={{backgroundColor: "red"}}
        onClick={() => {
          history.push("/")
          auth.logout()
        }}
      >
        Logout
      </Button>
      <ActualPalyer data={data || null}/>
    </div>
  );
};

export const Player = withRouter(graphql<PlayerProps>(query)((props: PlayerProps) => <PlayerCompoennt {...props}/>))


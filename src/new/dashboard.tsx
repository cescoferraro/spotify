import {gql} from "@apollo/client";
import * as React from "react";
import {useEffect} from "react";
import {ChildProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from "react-router";
import {PlayerComponentQuery} from "../types/PlayerComponentQuery";
import {Auth} from "./auth_store";

type PlayerProps = ChildProps<{ auth: Auth } & RouteComponentProps, PlayerComponentQuery>;
const query = gql`
  query PlayerComponentQuery{
    nowPlaying {
      Device {
        Name
      }
    }
  }
`;

const Name = ({data}: PlayerProps) => {
  console.log("data");
  console.log("data");
  console.log(data);
  const device = data?.nowPlaying?.Device;
  return (
    <div>
      <h2>{device?.Name}</h2>
    </div>
  );
};
export const Player = (
  withRouter(
    graphql<PlayerProps>(query)(
      (props: PlayerProps) => {
        const {data, auth, history} = props;
        console.info(props);
        useEffect(() => {
          if (["initial", ""].includes(auth.token)) {
            history.push("/")
          }
        }, [auth]);
        if (data?.loading) {
          return <div>Fetching</div>;
        }
        const notListeniing = data?.error?.message.includes("204");
        if (data?.error && !notListeniing) {
          return <div>Error</div>;
        }
        return (
          <React.Fragment>
            <div onClick={() => {
              data?.refetch({})
                .then(() => {
                  console.info("then");
                })
                .catch(() => {
                  console.info("catch");
                })
            }}>
              {!notListeniing && data?.nowPlaying ? <Name {...props}/> : "not listening"}
            </div>
          </React.Fragment>
        )
      }
    )
  ));

import gql from 'graphql-tag';
import * as React from "react";
import {ChildProps, graphql} from 'react-apollo';
import {NowListening} from "../reactappenv";

type Props = ChildProps<{ input: any }, { result?: NowListening.Root }>;

export const Repo = graphql<Props>(
  gql`
    query {
      result @rest(type: "Result", path: "/now") {
        timestamp
        is_playing
        device {
          is_active
          name
          __typename
        }
        __typename
      }
    }
  `
)((props: Props) => {
    console.log(99);
    console.log(props);
    const {data} = props;
    if (data && data.loading) {
      return <div>Loading...</div>;
    }
    if (data && data.result) {
      return (<div><h3>{data?.result?.device.name}</h3></div>);
    } else {
      return (
        <div
          onClick={() => {
            if (props.mutate) {
              props.mutate({variables: {}})
            }
          }}
        >
          <h2>slkdfk</h2>

        </div>
      );
    }
  }
);




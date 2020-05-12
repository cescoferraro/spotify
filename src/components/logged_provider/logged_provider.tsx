import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import * as React from "react";
import {ReactElement} from "react";
import {LoggedQuery} from "../../types/LoggedQuery";

const query = gql` query LoggedQuery { isLogged } `;

export const LoggedProvider = ({children}: LoggedProviderProps) => {
  const {data, loading} = useQuery<LoggedQuery>(query, {fetchPolicy: "no-cache"});
  let logged = data?.isLogged || false;
  return children({logged, loading});
}

interface LoggedProviderProps {
  children: (props: ChildrenProps) => ReactElement | null
}

interface ChildrenProps {
  logged: boolean,
  loading: boolean
}
interface LoggedComponentProps {
  loadingComponent: ReactElement
  notLoggedComponent: ReactElement
  loggedComponent: ReactElement
}

export const LoggedComponent = ({loadingComponent, notLoggedComponent, loggedComponent}: LoggedComponentProps) => {
  return (
    <LoggedProvider>
      {({logged, loading}) => loading ? loadingComponent : (logged ? (loggedComponent) : (notLoggedComponent))}
    </LoggedProvider>
  );
};

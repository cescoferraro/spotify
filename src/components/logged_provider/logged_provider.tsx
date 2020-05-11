import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {ReactElement} from "react";
import {LoggedQuery} from "../../types/LoggedQuery";

let query = gql`
  query LoggedQuery {
    isLogged
  }
`;

export const LoggedProvider = ({children}: { children: (logged: boolean) => ReactElement | null }) => {
  const {data} = useQuery<LoggedQuery>(query, {fetchPolicy: "no-cache"});
  let logged = data?.isLogged || false;
  return children(logged);
}

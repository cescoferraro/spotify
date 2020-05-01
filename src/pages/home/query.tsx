import {gql} from "@apollo/client";

export const query = gql`
  query HomeComponentQuery ($state:String) {
    login(state:$state)
    categoriesPaginated(cursor: 0, pace: 36){
      total
      categories{
        id
        name
        icons {
          url
        }
      }
    }
  }
`;

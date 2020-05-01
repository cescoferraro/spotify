import {gql} from "apollo-boost";

export const playlistQuery = gql`
  query PlaylistQuery($catID:String, $cursor:Int, $pace: Int) {
    playlistsPaginated(catID: $catID,cursor: $cursor,pace: $pace){
      total
      cursor
      playlists{
        id
        owner {
          id
        }
        name
        images {
          url
        }
      }
    }
  }
`;

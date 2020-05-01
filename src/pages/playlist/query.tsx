import {gql} from "apollo-boost";

export const playlistQuery = gql`
  query FullPlaylistQuery($playID:String,$owner:String, $cursor:Int, $pace: Int) {
    playlistSongsPaginated(owner: $owner,playID: $playID,cursor: $cursor,pace: $pace){
      total
      cursor
      songs {
        track {
          album {
            name
            images {
              url
            }
          }
          SimpleTrack {
            name
          }
        }
      }
    }
  }
`;

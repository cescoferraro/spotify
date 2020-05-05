import {gql} from "apollo-boost";

export const playlistQuery = gql`
  query FullPlaylistQuery($playID:String,$owner:String, $cursor:Int, $pace: Int) {
    playlistInfo(owner: $owner,playID: $playID){
      name
      description
      images {
        url
      }
    }
    playlistSongsPaginated(owner: $owner,playID: $playID,cursor: $cursor,pace: $pace){
      total
      cursor
      songs {
        track {
          popularity
          album {
            name
            images {
              url
            }

          }
          SimpleTrack {
            name
            artists {
              name
            }
          }
        }
      }
    }
  }
`;

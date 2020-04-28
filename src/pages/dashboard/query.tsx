import {gql} from "@apollo/client";

export const query = gql`
  query PlayerComponentQuery($cursor:Int, $pace: Int){
    mySongsPaginated(cursor: $cursor, pace: $pace){
      total
      cursor
      songs {
        track {
          popularity
          album {
            images {
              url
            }
          }
          SimpleTrack {
            name
            uri
            href
            artists {
              name
              uri
            }
            preview_url
          }
        }
      }
    }
    nowPlaying {
      repeat_state
      shuffle_state
      CurrentlyPlaying {
        is_playing
        timestamp
        context{
          href
          type
        }
        progress_ms
      }
      device {
        id
        is_active
        is_restricted
        name
        type
        volume_percent
      }
    }
  }
`;

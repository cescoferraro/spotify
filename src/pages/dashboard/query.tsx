import {gql} from "@apollo/client";

export const query = gql`
  query PlayerComponentQuery($cursor:Int){
    mySongsPaginated(cursor: $cursor){
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

            preview_url
            artists {
              name
              href
            }
          }
        }
      }
    }
    mySongsTotal
    mySongs {
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

          preview_url
          artists {
            name
            href
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

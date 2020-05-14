import {gql} from "apollo-boost";

export let nowquery2 = gql`
  query NowPlayingQuery {
    myDevices { name id is_active }
    nowPlaying {
      CurrentlyPlaying {
        is_playing
        progress_ms
        timestamp
        Item {
          SimpleTrack {
            duration_ms
            uri
            id
            name
            artists {
              name
            }
          }
          album {
            name
          }
        }
      }
      device {
        id
        is_active
        name
        volume_percent
        is_restricted
      }
    }
  }
`;

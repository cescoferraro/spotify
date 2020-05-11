import {gql} from "apollo-boost";

export let nowquery2 = gql`
    query NowPlayingQuery {
        nowPlaying {
            CurrentlyPlaying {
                is_playing
                progress_ms
                Item {

                    SimpleTrack {
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
                is_active
                name
                volume_percent
                is_restricted
            }
        }
    }
`;

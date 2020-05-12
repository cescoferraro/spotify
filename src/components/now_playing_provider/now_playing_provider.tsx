import {useQuery} from "@apollo/react-hooks";
import {ReactElement} from "react";
import {NowPlayingQuery} from "../../types/NowPlayingQuery";
import {nowquery2} from "./query";

export const SpotifyPLayerProvider = ({children}: {
  children: (props: { refetch: () => void, artists: string, playing: boolean, title: string }) => ReactElement | null
}) => {
  const {data, refetch} = useQuery<NowPlayingQuery>(nowquery2, { pollInterval: 1000 ,fetchPolicy: "no-cache"});
  let playing = data?.nowPlaying?.CurrentlyPlaying?.is_playing || false;
  let title = data?.nowPlaying?.CurrentlyPlaying?.Item?.SimpleTrack?.name || "";
  let artists = data?.nowPlaying?.CurrentlyPlaying?.Item?.SimpleTrack?.artists?.map((t) => t?.name).join(", ") || "name";
  return children({playing, title, artists, refetch});
}

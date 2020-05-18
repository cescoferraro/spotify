import {useQuery} from "@apollo/react-hooks";
import {useEffect, useState} from "react";
import {notEmpty} from "../../../shared/typescript";
import {FullPlaylistQuery, FullPlaylistQueryVariables} from "../../../types/FullPlaylistQuery";
import {playlistQuery} from "../query";
import {Song, SongsProviderInputProps} from "../types";

export const SongsProvider = ({children, pace, url, auth, player}: SongsProviderInputProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const variables: FullPlaylistQueryVariables = {pace, cursor: 0, owner: url.owner, playID: url.playID};
  const queryResult = useQuery<FullPlaylistQuery, FullPlaylistQueryVariables>(playlistQuery, {variables});
  useEffect(() => {
    const callback = async () => {
      const newVar = queryResult.data?.playlistSongsPaginated?.songs?.filter(notEmpty) || [];
      if (newVar.length > 0) setSongs(newVar);
    }
    callback();
  }, [queryResult, setSongs])
  const props = {auth, ...variables, player, songs, pace, ...url, ...queryResult};
  return children(props)
}

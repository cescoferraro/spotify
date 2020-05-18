import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import React, {ReactElement, useEffect, useState} from "react";
import {QueryResult} from "react-apollo";
import {match, RouteComponentProps, withRouter} from "react-router";
import {notEmpty} from "../../shared/typescript";
import {Auth} from "../../store/auth_store";
import {Player} from "../../store/player_store";
import {
  FullPlaylistQuery,
  FullPlaylistQuery_playlistSongsPaginated_songs,
  FullPlaylistQueryVariables
} from "../../types/FullPlaylistQuery";
import {LikedSongsQuery, LikedSongsQueryVariables} from "../../types/LikedSongsQuery";
import {DesktopPage} from "./desktop/desktop";
import {MobilePage} from "./mobile/header";
import {playlistQuery} from "./query";

type PlaylistPageUrlProps = { catID: string, owner: string, playID: string };

type PlaylistPageBaseProps = { player: Player, auth: Auth };

type PlaylistPage = RouteComponentProps<PlaylistPageUrlProps> & PlaylistPageBaseProps;

interface SongsProviderInputProps extends PlaylistPageBaseProps {
  url: PlaylistPageUrlProps
  pace: number
  children: (re: SongsProviderChildrenProps) => ReactElement
}

export type Song = FullPlaylistQuery_playlistSongsPaginated_songs;

interface SongsProviderChildrenProps extends PlaylistPageBaseProps, QueryResult<FullPlaylistQuery>, PlaylistPageUrlProps {
  pace: number
  songs: Song[]
}

interface LikedProviderChildrenProps {
  refreshLiked: () => void
  liked: string[]
}

export type PlaylistProps =
  LikedProviderChildrenProps
  & PlaylistPageBaseProps
  & SongsProviderChildrenProps
  & FullPlaylistQueryVariables ;

const query = gql`
  query LikedSongsQuery($ids:[String]){
    likedSongs(ids:$ids)
  }
`;

const SongsProvider = ({children, pace, url, auth, player}: SongsProviderInputProps) => {
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

const LikedProvider = ({children, songs}: {
  songs: Song[]
  children: (st: LikedProviderChildrenProps) => ReactElement
}) => {
  const [liked, setLiked] = useState<string[]>([]);
  const [fetchIDS, other] = useLazyQuery<LikedSongsQuery, LikedSongsQueryVariables>(query);
  const songIDs = songs.map((r) => r.track?.SimpleTrack?.id).filter(notEmpty);
  useEffect(() => {
    const callback = async () => {
      const songIDs = songs.map((r) => r.track?.SimpleTrack?.id).filter(notEmpty);
      if (songIDs.length !== 0) {
        await fetchIDS({variables: {ids: songIDs}})
        let local_liked = other.data?.likedSongs;
        if (local_liked) {
          if (local_liked.length !== liked.length) {
            setLiked(local_liked.filter(notEmpty))
          }
        }
      }
    }
    callback();
  }, [songs, other.data, setLiked, liked, fetchIDS])
  console.log(liked)
  return children({
    liked, refreshLiked: () => {
      other.refetch({ids: songIDs});
    }
  })
}

const varsFromMatchParams = (input: match<PlaylistPageUrlProps>): PlaylistPageUrlProps => {
  return {
    catID: input?.params.catID || "erro",
    playID: input?.params.playID || "erro",
    owner: input?.params.owner || "spotify"
  };
};

export const PlaylistPage = withRouter(
  ({auth, player, match}: PlaylistPage) => {
    return (
      <SongsProvider auth={auth} player={player} pace={20} url={varsFromMatchParams(match)}>
        {(props: SongsProviderChildrenProps) => (
          <LikedProvider songs={props.songs}>
            {({liked, refreshLiked}) =>
              <React.Fragment>
                <MobilePage refreshLiked={refreshLiked} liked={liked} {...props}/>
                <DesktopPage refreshLiked={refreshLiked} liked={liked} {...props}/>
              </React.Fragment>
            }
          </LikedProvider>
        )}
      </SongsProvider>
    );
  }
);

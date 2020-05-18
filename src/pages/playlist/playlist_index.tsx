import React from "react";
import {match, withRouter} from "react-router";
import {DesktopPage} from "./desktop/desktop";
import {MobilePage} from "./mobile/header";
import {LikedProvider} from "./shared/liked_provider";
import {SongsProvider} from "./shared/songs_provider";
import {PlaylistPageProps, PlaylistPageUrlProps, SongsProviderChildrenProps} from "./types";

const varsFromMatchParams = (input: match<PlaylistPageUrlProps>): PlaylistPageUrlProps => {
  return {
    catID: input?.params.catID || "erro",
    playID: input?.params.playID || "erro",
    owner: input?.params.owner || "spotify"
  };
};

export const PlaylistPage = withRouter(
  ({auth, player, match}: PlaylistPageProps) => {
    return (
      <SongsProvider auth={auth} player={player} pace={20} url={varsFromMatchParams(match)}>
        {(props: SongsProviderChildrenProps) => (
          <LikedProvider songs={props.songs}>
            {({liked, refreshLiked, loading}) =>
              <React.Fragment>
                <MobilePage loadingLiked={loading} refreshLiked={refreshLiked} liked={liked} {...props}/>
                <DesktopPage loadingLiked={loading} refreshLiked={refreshLiked} liked={liked} {...props}/>
              </React.Fragment>
            }
          </LikedProvider>
        )}
      </SongsProvider>
    );
  }
);

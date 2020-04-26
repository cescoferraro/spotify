import * as React from "react";
import {ChildProps} from "react-apollo";
import ReactJkMusicPlayer from "react-jinke-music-player";
import {PlayerComponentQuery, PlayerComponentQuery_mySongs} from "../../types/PlayerComponentQuery";
import {audioList1} from "./mock_audio_list";

export const ActualPalyer = ({data}: { data?: ChildProps<any, PlayerComponentQuery> }) => {
  const yay = data ? (data?.mySongs ? data?.mySongs
    .map((e: PlayerComponentQuery_mySongs) => {
      const images = e?.track?.album?.images || []
      const artists = e?.track?.SimpleTrack?.artists || []
      return ({
        name: e?.track?.SimpleTrack?.name,
        musicSrc: e?.track?.SimpleTrack?.preview_url || " ",
        singer: artists.length === 0 ? "" : artists.map((r) => (r?.name)).join(" "),
        cover: images.length === 0 ? "" : (images[images.length - 1]?.url || ""),
        lyric: "sadf",
      })
    }) : []) : []
  console.log(yay)
  return (
    <ReactJkMusicPlayer
      audioLists={yay.length === 0 ? audioList1 : yay}
      defaultPlayIndex={0}
      mode={"full"}
      bounds={'body'}
      clearPriorAudioLists={false}
      autoPlayInitLoadPlayList={false}
      preload={false}
      glassBg={false}
      remember={false}
      remove={false}
      defaultPosition={{top: 300, left: 120}}
      once={false}
      autoPlay={false}
      toggleMode={true}
      showMiniModeCover={false}
      drag={true}
      seeked={false}
      showMediaSession={false}
      showPlay={true}
      showReload={false}
      showDownload={true}
      showPlayMode={true}
      showThemeSwitch={false}
      showLyric={false}
      showDestroy={false}
      extendsContent={false}
      defaultVolume={1}
      playModeShowTime={600}
      loadAudioErrorPlayNext={true}
      autoHiddenCover={true}
      spaceBar={true}
    />
  );
};

import {gql} from "@apollo/client";
import Button from "material-ui/RaisedButton";
import * as React from "react";
import {ChildProps, graphql} from 'react-apollo';
import ReactJkMusicPlayer from "react-jinke-music-player";
import {RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../../store/auth_store";
import {PlayerComponentQuery} from "../../types/PlayerComponentQuery";

type PlayerProps = ChildProps<{ auth: Auth } & RouteComponentProps, PlayerComponentQuery>;

const query = gql`
  query PlayerComponentQuery{
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

const PlayerCompoennt = ({data, auth, history}: PlayerProps) => {
  console.log(data?.mySongs)
  return (
    <div
      style={{padding: 20, width: "100vw"}}
      onClick={() => {
        // data?.refetch({}).then(() => true).catch(() => true);
      }}
    >
      <p style={{color: "white", width: "calc( 100vw - 40px )", overflowWrap: "break-word"}}>{auth.token}</p>
      <Button
        style={{backgroundColor: "red"}}
        onClick={() => {
          history.push("/")
          auth.logout()
        }}
      >
        Logout
      </Button>
      <ReactJkMusicPlayer
        audioLists={data ? (data?.mySongs ? data?.mySongs

          .map((e) => {

            console.log(e?.track?.SimpleTrack?.preview_url)
            const images = e?.track?.album?.images || []
            const artists = e?.track?.SimpleTrack?.artists || []
            console.log(images[0])
            return ({
              name: e?.track?.SimpleTrack?.name,
              musicSrc: e?.track?.SimpleTrack?.preview_url || " ",
              singer: artists.length === 0 ? "" : artists.map((r) => (r?.name)).join(" "),
              cover: images.length === 0 ? "" : (images[images.length - 1]?.url || ""),
              // musicSrc: '//cdn.lijinke.cn/gaoshang.mp3',
              lyric: "sadf",
            })
          }) : []) : []}
        defaultPlayIndex={0}
        mode={"full"}
        bounds={'body'}
        clearPriorAudioLists={false}
        autoPlayInitLoadPlayList={false}
        preload={false}
        glassBg={false}
        remember={false}
        remove={false}
        defaultPosition={{
          top: 300,
          left: 120,
        }}
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
    </div>
  );
};

export const Player = (
  withRouter(
    graphql<PlayerProps>(query)(
      (props: PlayerProps) => {
        const {data} = props;
        const notListeniing = data?.error?.message.includes("204");
        return (
          <React.Fragment>
            {(data?.error && !notListeniing) ?
              <div>Error</div> :
              (data?.loading ?
                  <div>Fetching</div> : (
                    // TODO REview
                    <PlayerCompoennt {...props}/>)
              )}
          </React.Fragment>
        )
      }
    )
  ));

export const audioList1 = [
  {
    name: '高尚',
    singer: '薛之谦',
    cover: '//cdn.lijinke.cn/nande.jpg',
    musicSrc: '//cdn.lijinke.cn/gaoshang.mp3',
    lyric: "sadf",
  },
  {
    name: 'Despacito',
    singer: 'Luis Fonsi',
    cover:
      'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
    musicSrc: () => {
      return Promise.resolve(
        'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3'
      )
    },
  },
  {
    name: 'Bedtime Stories',
    singer: 'Jay Chou',
    cover:
      'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
    musicSrc:
      'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
  },
  {
    name: 'Dorost Nemisham',
    singer: 'Sirvan Khosravi',
    cover:
      'https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg',
    musicSrc: () => {
      return Promise.resolve(
        'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3'
      )
    },
  },
  {
    name: '难得',
    singer: '安来宁',
    cover: '//cdn.lijinke.cn/nande.jpg',
    musicSrc: '//cdn.lijinke.cn/nande.mp3',
  },
];


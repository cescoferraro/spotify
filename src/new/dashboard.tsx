import {gql} from "@apollo/client";
import * as React from "react";
import {useEffect} from "react";
import {ChildProps, graphql} from 'react-apollo';
import ReactJkMusicPlayer from "react-jinke-music-player";
import {RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../store/auth_store";
import {PlayerComponentQuery} from "../types/PlayerComponentQuery";

type PlayerProps = ChildProps<{ auth: Auth } & RouteComponentProps, PlayerComponentQuery>;

const query = gql`
  query PlayerComponentQuery{
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

const Name = ({data, auth}: PlayerProps) => {
  console.log("data");
  console.log("data");
  console.log(data);
  // const device = data?.nowPlaying?.device;
  return (
    <div
      onClick={() => {
        data?.refetch({}).then(() => true).catch(() => true);
      }}
    >
      <p>{auth.token}</p>
    </div>
  );
};

export const Player = (
  withRouter(
    graphql<PlayerProps>(query)(
      (props: PlayerProps) => {
        const {data} = props;
        console.info(props);
        useEffect(() => {
          console.log(data?.nowPlaying?.device?.volume_percent)
          console.log(data?.nowPlaying?.device?.name)
        }, [data]);
        const notListeniing = data?.error?.message.includes("204");
        return (
          <React.Fragment>
            <div>

              {(data?.error && !notListeniing) ?
                <div>Error</div> :
                (data?.loading ? <div>Fetching</div> :
                    (
                      (!notListeniing && data?.nowPlaying) ?
                        <Name {...props}/> :
                        "not listening")
                )
              }
            </div>
            <ReactJkMusicPlayer
              audioLists={audioList1}
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
              showMiniModeCover={true}
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
          </React.Fragment>
        )
      }
    )
  ));

const audioList1 = [
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


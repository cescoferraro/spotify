import * as React from "react";
import {SpotifyPLayerProvider} from "../../components/now_playing_provider/now_playing_provider";
import {Player} from "../../store/player_store";
import {ActionBox, ControlBox, DeviceBox, InfoBox, SliderBox} from "./mobile";

export const SpotifyPlayer = (props: { player: Player, mobile: boolean }) => {
  const {mobile} = props
  return (
    <SpotifyPLayerProvider player={props.player}>
      {({playing,progress,duration, title, devices, loading, artists, refetch, device, uri}) => {
        return (
          <React.Fragment>
            <DeviceBox device={device} devices={devices} desktop={!mobile}/>
            <InfoBox loading={loading} desktop={!mobile} title={title} artists={artists}/>
            <ActionBox
              isPlaying={playing}
              refetch={refetch}
              uri={uri}
              device={device}
              playing={playing}
              desktop={!mobile}
            />
            <SliderBox
              playing={playing}
              duration={duration}
              progress={progress}

              desktop={!mobile}/>
            <ControlBox desktop={!mobile}/>
          </React.Fragment>
        )
      }}
    </SpotifyPLayerProvider>
  );
};

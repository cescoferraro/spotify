import {Box, Paper, WithWidthProps} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import withWidth from "@material-ui/core/withWidth";
import * as React from "react";
import {LoggedProvider} from "../components/logged_provider/logged_provider";
import {NowPlaying} from "../components/now_playing_provider/now_playing_provider";
import {Player} from "../store/player_store";
import {PlayerContainerProviderComponent} from "./container";
import {DevicesProvider} from "./drawer";
import {ActionBox, ControlBox, DeviceBox, InfoBox, SliderBox} from "./mobile";
import {PlayerBackDrop} from "./playerBackDrop";
import {innerStyle, paperStyle} from "./styles";

export const PlayerComponentDrawer = withWidth()(({width, player}: WithWidthProps & { player: Player }) => {
    return (
      <PlayerContainerProviderComponent player={player} width={width}>
        {({opened, mobile}) => (
          <React.Fragment>
            <PlayerBackDrop opened={opened} onClick={() => player.setOpened(!opened)} mobile={mobile}/>
            <Slide direction="up" in={opened} mountOnEnter={true} unmountOnExit={true}>
              <Paper style={paperStyle(!mobile)} elevation={4}>
                <Box boxShadow={4} style={innerStyle(!mobile)}>
                  <LoggedProvider>
                    {(logged) => {
                      console.log(logged)
                      return (
                        <DevicesProvider logged={logged} player={player}>
                          {({devices, loading, device}) => (
                            <NowPlaying>
                              {({playing, title, artists, refetch}) => {
                                return (
                                  <React.Fragment>
                                    {logged &&
                                    <DeviceBox device={device} devices={devices} loading={loading} desktop={!mobile}/>}
                                    {playing && <InfoBox desktop={!mobile} title={title} artists={artists}/>}
                                    <ActionBox
                                      isPlaying={playing}
                                      refetch={refetch} uri={player.current_song.uri} device={device}
                                               playing={playing} desktop={!mobile}/>
                                    <SliderBox desktop={!mobile}/>
                                    <ControlBox desktop={!mobile}/>
                                  </React.Fragment>
                                )
                              }}
                            </NowPlaying>
                          )}
                        </DevicesProvider>
                      );
                    }}
                  </LoggedProvider>
                </Box>
              </Paper>
            </Slide>
          </React.Fragment>

        )}
      </PlayerContainerProviderComponent>
    );
  }
);


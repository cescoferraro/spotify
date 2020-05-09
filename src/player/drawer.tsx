import {useQuery} from "@apollo/react-hooks";
import {Box, Paper, WithWidthProps} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import {gql} from "apollo-boost";
import {Observer} from "mobx-react";
import * as React from "react";
import {useEffect} from "react";
import {Player} from "../store/player_store";
import {MyDevicesQuery} from "../types/MyDevicesQuery";
import {ActionBox, ControlBox, DeviceBox, InfoBox, SliderBox} from "./mobile";
import {innerStyle, paperStyle} from "./styles";

let query = gql`
  query MyDevicesQuery {
    myDevices {
      name
      id
      is_active
    }
  }
`;

export const PlayerDrawer = (props: { props: WithWidthProps & { player: Player }, desktop: boolean }) => {
  const {data, loading} = useQuery<MyDevicesQuery>(query);
  console.log(data, loading)
  let devices = data?.myDevices || []
  useEffect(() => {
    if (devices.length > 0) {
      const device = devices[0];
      const deviceId = device?.id || "";
      props.props.player.setDevice(device ? deviceId : "")
    }
  }, [devices, props.props.player])
  return (
    <Observer>
      {() => (
        <Slide direction="up" in={props.props.player.opened} mountOnEnter={true} unmountOnExit={true}>
          <Paper style={paperStyle(props.desktop)} elevation={4}>
            <Box boxShadow={4} style={innerStyle(props.desktop)}>
              <DeviceBox

                devices={devices}
                desktop={props.desktop} player={props.props.player}/>
              <InfoBox desktop={props.desktop} props={props.props}/>
              <ActionBox player={props.props.player} desktop={props.desktop}/>
              <SliderBox desktop={props.desktop}/>
              <ControlBox desktop={props.desktop}/>
            </Box>
          </Paper>
        </Slide>
      )}
    </Observer>
  );
};

import {Box, Paper, WithWidthProps} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import {Observer} from "mobx-react";
import * as React from "react";
import {Player} from "../store/player_store";
import {ActionBox, ControlBox, InfoBox, SliderBox} from "./mobile";
import {paperStyle} from "./styles";

export const PlayerDrawer = (props: { props: WithWidthProps & { player: Player }, desktop: boolean }) => {
  return (
    <Observer>
      {() => (
        <Slide direction="up" in={props.props.player.opened} mountOnEnter={true} unmountOnExit={true}>
          <Paper style={paperStyle(props.desktop)} elevation={4}>
            <Box
              boxShadow={4}
              style={{
                width: "100%",
                height: props.desktop ? 120 : 300,
                display: "flex",
                flexDirection: props.desktop ? "row" : "column",
                justifyContent: "space-evenly"
              }}
            >
              <InfoBox desktop={props.desktop} props={props.props}/>
              <ActionBox desktop={props.desktop}/>
              <SliderBox desktop={props.desktop}/>
              <ControlBox desktop={props.desktop}/>
            </Box>
          </Paper>
        </Slide>
      )}
    </Observer>
  );
};

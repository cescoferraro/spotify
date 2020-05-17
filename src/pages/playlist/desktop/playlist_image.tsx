import {Box} from "@material-ui/core";
import React from "react";

export const NewComponentImage = (props: { data?: any }) => {
  const images = props.data?.playlistInfo?.images || [];
  return (
    <Box style={{width: "35%", display: "flex"}}>
      <img
        alt={"desktop_playlist_image"}
        style={{
          transform: "translate(0px, -50%)",
          width: 250,
          height: 250,
          marginLeft: "auto",
          marginRight: "auto"
        }}
        src={images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg"}
      />
    </Box>
  )
};

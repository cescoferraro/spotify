import * as React from "react";

export const PlayerBackDrop = (props: { opened: boolean, onClick: () => void, mobile: boolean }) => {
  return (
    <div
      onClick={props.onClick}
      style={{
        width: "100vw",
        visibility: props.opened ? "unset" : "hidden",
        height: props.mobile ? "calc( 100vh - 400px)" : "calc( 100vh - 120px)",
        top: 0
      }}
    />
  );
};

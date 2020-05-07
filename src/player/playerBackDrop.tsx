import * as React from "react";

export const PlayerBackDrop = (props: { opened: boolean, onClick: () => void, desktop: boolean }) => {
  return (
    <div
      onClick={props.onClick}
      style={{
        width: "100vw",
        visibility: props.opened ? "unset" : "hidden",
        height: props.desktop ? "calc( 100vh - 120px)" : "65vh",
        top: 0
      }}
    />
  );
};

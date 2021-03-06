import {isWidthUp, withWidth, WithWidthProps} from "@material-ui/core";
import * as React from "react";
import BouncingPreloader from 'react-bouncing-preloader';
import {Auth} from "../../store/auth_store";
import {SpotifyAuthUrl} from "./home";
import {SpotifyLogoSvg} from "./spotify_icon";

type ExplanationProps = WithWidthProps & { auth: Auth };

export const Explanation = withWidth()
(({width}: ExplanationProps) => {
    let fontSize = isWidthUp(width || "sm", "xs") ? 40 : 80;
    let flexer = {alignItems: "center", display: "flex", justifyContent: "center"};
    return (

      <SpotifyAuthUrl>
        {(url: string) => {
          return (

            <div style={{height: "100vh", width: "100vw", ...flexer}}>
              <div onClick={() => window.location.href = url} style={{height: "min-content"}}>
                <div style={{height: "min-content", ...flexer}}>
                  <div style={{paddingRight: 30, ...flexer}}><SpotifyLogoSvg/></div>
                  <div style={{...flexer}}>
                    <h1 style={{fontSize, ...flexer}}> Spotify </h1>
                  </div>
                </div>
                <div style={{...flexer}}>
                  <h2>Golang + GraphQL + React Stack</h2>
                </div>
              </div>
              <div style={{position: "absolute", bottom: 0, right: 0}}>
                <BouncingPreloader
                  icons={['https://pngimage.net/wp-content/uploads/2018/06/scroll-icon-png-2.png']}
                  leftRotation="0deg"
                  rightRotation="0deg"
                  size={100}
                  leftDistance={-50}
                  rightDistance={-50}
                  speed={1000}
                />
              </div>
            </div>
          )
        }}
      </SpotifyAuthUrl>
    );
  }
);

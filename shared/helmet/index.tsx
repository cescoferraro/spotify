import * as React from "react"
import { Helmet } from "react-helmet"
const Cesco = require("../images/boil.jpg")

export const MyHelmet = ({ title }) => (
    <Helmet>
        <html lang="pt" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <title>{"spotify"} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1ED760" />
        <meta property="og:title" content="spotify" />
        <meta property="og:url" content="https://spotify.cescoferraro.xyz" />
        <meta property="og:image" content={Cesco} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="spotify" />
        <meta property="og:description" content="PWA Spotify Client" />
    </Helmet>

)

export const UserHelmet = ({ id }) => (
    <Helmet>
        <meta charSet="utf-8" />
    </Helmet>
)

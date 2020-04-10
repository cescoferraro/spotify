/// <reference types="react-scripts" />

declare module SpotifyProfile {

  export interface ExternalUrls {
    spotify: string;
  }

  export interface Followers {
    total: number;
    href: string;
  }

  export interface Image {
    height: number;
    width: number;
    url: string;
  }

  export interface RootObject {
    display_name: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    uri: string;
    country: string;
    email: string;
    product: string;
    birthdate: string;
  }

}


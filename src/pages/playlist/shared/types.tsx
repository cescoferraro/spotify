import {WithWidthProps} from "@material-ui/core";
import {Auth} from "../../../store/auth_store";
import {Player} from "../../../store/player_store";

export type PlaylistAppProps = {
  songs: any[],
  auth: Auth,
  player: Player,
  catID: string,
  query: string,
  loading: boolean,
  setQuery: (r: string) => void,
  owner: string,
  playID: string,
  history: any,
  pace: number,
  data: any,
  fetchMore: any
};
export type PlaylistProps = WithWidthProps & PlaylistAppProps ;

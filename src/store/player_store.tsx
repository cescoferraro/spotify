import {action, observable} from "mobx";

interface CurrentSong {
  name: string;
  uri: string;
  artist: string;
  image: string;
}

let initial = "initial";

export class Player {

  @observable
  public opened: boolean = false;

  @observable
  public device: string= "";

  @observable
  public current_song: CurrentSong = {
    name: initial,
    artist: initial,
    uri: initial,
    image: initial,
  };

  @action
  public setCurrentSong(st: CurrentSong, opened: boolean = true) {
    this.opened = opened;
    this.current_song = st;
  }


  @action
  public setDevice(st: string) {
    this.device = st;
  }
  @action
  public setOpened(st: boolean) {
    this.opened = st;
  }

}

import {action, observable} from "mobx";

interface CurrentSong {
  name: string;
  artist: string;
  image: string;
}

let initial = "initial";

export class Player {

  @observable
  public opened: boolean = false;

  @observable
  public current_song: CurrentSong = {
    name: initial,
    artist: initial,
    image: initial,
  };

  @action
  public setCurrentSong(st: CurrentSong, opened: boolean = true) {
    this.opened = opened;
    this.current_song = st;
  }

  @action
  public setOpened(st: boolean) {
    this.opened = st;
  }

}

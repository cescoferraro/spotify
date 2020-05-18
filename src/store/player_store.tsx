import {action, observable} from "mobx";

type PlayerMode = "sample" | "spotify";

export class Player {

  @observable
  public songs: any[] = [];
  @observable
  public source: HTMLAudioElement = new Audio();

  @observable
  public mode: PlayerMode = "sample";

  @observable
  public opened: boolean = false;

  @action
  public setMode(st: PlayerMode) {
    this.mode = st;
  }

  @action
  public setSongs(st: any[]) {
    this.songs = st;
  }

  @action
  public playHtml() {
    if (this.songs.length > 0) {
      if (this.source) {
        this.source.pause()
      }
      this.source = new Audio(this.songs[0].url)
      this.source.play()
    }
  }

  @action
  public setOpened(st: boolean) {
    this.opened = st;
  }

}

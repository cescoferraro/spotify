import {action, observable} from "mobx";

export class Player {

  @observable
  public songs: any[] = [];
  @observable
  public source: HTMLAudioElement = new Audio();

  @observable
  public opened: boolean = false;

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

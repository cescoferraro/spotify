import {action, observable} from "mobx";

export class Player {

  @observable
  public opened: boolean = false;

  @action
  public setOpened(st: boolean) {
    this.opened = st;
  }

}

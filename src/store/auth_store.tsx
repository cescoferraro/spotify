import {action, autorun, observable, set, toJS} from "mobx";
import store from "store";

const key = "spotify-mui-store";
const autoSave = (_this: Auth) => {
  let firstRun = true;
  autorun(() => {
    if (firstRun) {
      const existingStore = store.get(key);
      if (existingStore) {
        set(_this, {...existingStore, page: 0, index: 0, query: ""});
      }
    }
    const hey = toJS(_this);
    store.set(key, {...hey, page: 0, index: 0, query: ""});
  });
  firstRun = false;
};

let initial = "initial";
type initialType = "initial"

export class OAuthToken {
  @observable
  public access_token: string = initial;
  @observable
  public refresh_token: string | initialType = initial;
  @observable
  public token_type: string | initialType = initial;
  @observable
  public expiry: number = 0;
}

export class Auth extends OAuthToken {

  @observable
  public token: string | initialType = initial;

  constructor() {
    super()
    autoSave(this);
  }

  @action
  public setToken(st: string) {
    this.token = st;
  }

  @action
  public setOAuth(a: OAuthToken) {
    this.access_token = a.access_token;
    this.refresh_token = a.refresh_token;
    this.token_type = a.token_type;
    this.expiry = a.expiry;
  }

  @action
  logout() {
    this.access_token = initial;
    this.refresh_token = initial;
    this.token_type = initial;
    this.token = initial;
    this.expiry = 0;
  }
}

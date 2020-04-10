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

export class Auth {

    @observable
    public token: string | "initial" = "initial";
    @observable
    public profile: SpotifyProfile.RootObject | null = null;

    constructor() {
        autoSave(this);
    }

    @action
    public setProfile(st: SpotifyProfile.RootObject) {
        this.profile = st;
    }

    @action
    public setToken(st: string) {
        this.token = st;
    }

}

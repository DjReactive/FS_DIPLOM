import { makeAutoObservable } from 'mobx';

class userStore {
  lockable = ['user', 'token'];
  storage = localStorage;
  update = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  *login(request) {
    if (this.loading || !request) return false;

    const response = yield this.loader(request)

    if (!response.error && response.access_token) {
      this._setToken(response);
      this._setUser(response.user);
      return true;
    }

    return false;
  }

  *logout(request) {
    if (this.loading || !request) return false;

    const response = yield this.loader(request)

    if (!response.error) {
      this.clear();
      return true;
    }

    return false;
  }

  getToken() {
    return JSON.parse(this.storage.getItem('token'));
  }

  _setToken({token, token_access}) {
    this.update = Date.now();
    this.storage.setItem('token', JSON.stringify({
      token, token_access
    }));
  }

  getUser() {
    return JSON.parse(this.storage.getItem('user'));
  }

  _setUser(user) {
    this.update = Date.now();
    this.storage.setItem('user', JSON.stringify(user));
  }

  setData(prop, data) {
    if (this.lockable.includes(prop)) return {
      error: `${prop} is lockable!`
    }
    this.storage.setItem(prop, JSON.stringify(data));
  }

  getData(prop) {
    return JSON.parse(this.storage.getItem(prop));
  }

  removeData(prop) {
    this.storage.removeItem(prop);
  }

  clear() {
    this.update = Date.now();
    this.storage.clear();
  }

  *loader(request) {
    this.loading = true;
    const response = yield request;
    this.loading = false;
    return response;
  }
}

export default new userStore();

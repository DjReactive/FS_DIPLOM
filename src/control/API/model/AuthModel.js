import Request from '../request'
const path = {
  login: '/login',
  register: '/register',
  logout: '/logout',
}

export default class AuthModel {
  constructor(obj) {
    this.url = obj.location;
  }

  async login(data, errorCallback) {
    return await this.request(
      Request.post(this.url + path.login, data), errorCallback
    );
  }

  async logout(token, errCallback) {
    return await this.request(
      Request.post(this.url + path.logout, null, this._authHeader(token)), errCallback
    );
  }

  async me(token, errCallback) {
    return await this.request(
      Request.post(this.url + "/me", null, this._authHeader(token)),errCallback
    );
  }

  async updateSettings(token, option, value, access, errCallback) {
    return await this.request(
      Request.update(`${this.url}/settings/${option}`, { value, access }, 
      this._authHeader(token)), errCallback
    );
  }

  async request(req, clb) {
    return await req.then(res => {
      clb(res.error);
      return res;
    });
  }

  _authHeader({ token_type, token_access }) {
    return {
      header: {
        'Authorization': `${token_type} ${token_access}`,
      }
    }
  }
}

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.headers['Accept'] = 'application/json';

export default class Request {
  // GET
  static async get(url, headers = {}) {
    return await
      Request.send(axios.get(url, headers));
  }

  // POST
  static async post(url, data, headers = {}) {
    return await
      Request.getCSRFToken()
        .then(() =>
          Request.send(axios.post(url, data, headers)));
  }

  // DELETE
  static async delete(url, headers = {}) {
    return await
      Request.getCSRFToken()
        .then(() =>
          Request.send(axios.delete(url, headers)));
  }

  // UPDATE
  static async update(url, data, headers = {}) {
    return await
      Request.getCSRFToken()
        .then(() =>
          Request.send(axios.patch(url, data, headers)));
  }

  static async send(request) {
    return await
      request
        .then(response => response.data)
        .catch(error => Request.errorResponse(error));
  }

  static async getCSRFToken() {
    return await
      axios.get(`${process.env.REACT_APP_SERVER_URL}/sanctum/csrf-cookie`);
  }

  static errorResponse({ response, code, message }) {
    return {
      error : response && response.data.message ?
      response.data.message : message || response.statusText
    };
  }
}

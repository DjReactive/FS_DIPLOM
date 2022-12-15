import Request from '../request'

export default class SettingsModel {
  constructor(obj) {
    this.url = `${obj.location}/settings`;
  }
  async getAll() {
    return await
      Request.get(this.url);
  }
  async access() {
    return await
      Request.get(this.url);
  }
}

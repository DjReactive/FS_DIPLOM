import Request from '../request'

export default class HallModel {
  constructor(obj) {
    this.url = `${obj.location}/hall`;
  }
  async add(data) {
    return await
      Request.post(this.url, data);
  }
  async remove(id) {
    return await
      Request.delete(`${this.url}/${id}`);
  }
  async update(id, data) {
    return await
      Request.update(`${this.url}/${id}`, data);
  }
  async get(id) {
    return await
      Request.get(`${this.url}/${id}`);
  }
  async getAll() {
    return await
      Request.get(this.url);
  }
}

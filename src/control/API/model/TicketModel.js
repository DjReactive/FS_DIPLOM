import Request from '../request'

export default class TicketModel {
  constructor(obj) {
    this.url = `${obj.location}/tickets`;
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
      Request.update(`${this.url}/${id}`);
  }
  async getQR(id) {
    return await
      Request.post(`${this.url}/${id}/qrcode`, {});
  }
  async get(id) {
    return await
      Request.get(`${this.url}/${id}`);
  }
  async getAll(data) {
    const url = new URLSearchParams(data);
    return await
      Request.get(`${this.url}?${url}`);
  }
}
import Request from '../request'

export default class TicketModel {
  constructor(obj) {
    this.url = `${obj.location}/tickets`;
  }
  async create(data) {
    return await
      Request.post(this.url, data);
  }
  async getQR(id) {
    return await
      Request.post(`${this.url}/${id}/qrcode`, {});
  }
  async read(id) {
    return await
      Request.get(`${this.url}/${id}`);
  }
  async readAll(data) {
    const url = new URLSearchParams(data);
    return await
      Request.get(`${this.url}?${url}`);
  }
  async update(id, data) {
    return await
      Request.update(`${this.url}/${id}`, data);
  }
  async delete(id) {
    return await
      Request.delete(`${this.url}/${id}`);
  }
}
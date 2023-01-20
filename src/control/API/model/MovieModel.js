import Request from '../request'

export default class MovieModel {
  constructor(obj) {
    this.url = `${obj.location}/movie`;
  }
  async create(data) {
    return await
      Request.post(this.url, data);
  }
  async getPage(page) {
    return await
      Request.get(`${this.url}?page=${page}`);
  }
  async read(id) {
    return await
      Request.get(`${this.url}/${id}`);
  }
  async readAll() {
    return await
      Request.get(this.url);
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

import { makeAutoObservable } from 'mobx';
import { isIterable } from '../functions';

class ticketsStore {
  constructor(loading = false) {
    this.loading = loading;
    this.content = { data: [] }
    makeAutoObservable(this);
  }

  *loader(request) {
    this.loading = true;
    const response = yield request;
    this.loading = false;
    return response;
  }

  *getting(request, errCallback) {
    if (this.loading) return;

    this.content = { data: [] }
    const response = yield this.loader(request);

    if (isIterable(response)) {
      this.content = response.map(o => ({
        ...o, seat_places: JSON.parse(o.seat_places), 
      }));
    }

    errCallback(response.error || this.content.error);
    return this.content;
  }

  *getQRCode(request, errCallback) {
    if (this.loading) return;

    return yield this.loader(request);
  }

  // getTicket(id) {
  //   return this.content && this.content.data.find(o => o.id === id);
  // }

}

export default new ticketsStore();

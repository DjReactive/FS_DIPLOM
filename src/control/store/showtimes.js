import { makeAutoObservable } from 'mobx';

class ShowTimesStore {
  constructor(loading = false) {
    this.loading = loading;
    this.content = { data: [] }
    makeAutoObservable(this);
  }

  *loader(request) {
    this.loading = yield true;
    const response = yield request;
    this.loading = yield false;
    return response;
  }

  *getting(request, errCallback) {
    if (this.loading) return;

    this.content = { data: [] }
    const response = yield this.loader(request);

    this.content = { ...this.content, ...response }
    errCallback(this.content.error || this.content.message);
  }
}

export default new ShowTimesStore();
import { makeAutoObservable } from 'mobx';

class HallsStore {
  constructor(loading = false) {
    this.current = { id: null };
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

    this.content = { ...this.content, ...response }
    errCallback(this.content.error || this.content.message);
  }

  choosenHall(id) {
    this.current = { id: null };
    const hall = this.getHall(id);

    if (!hall) return;

    this.setTable(hall);
  }

  getHall(id) {
    return this.content && this.content.data.find(o => o.id === id);
  }

  /*
  Метод предназначен для записи таблицы с местами зала
  @name - имя переменной, добавляемой в объект current
  @value - присваиваемое значение
  */
  setTable(objValues) {
    for (const [key, value] of Object.entries(objValues)) {
      this.current = { ...this.current, [key]: value, };
    }
  }
}

export default new HallsStore();

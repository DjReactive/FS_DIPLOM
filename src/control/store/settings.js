import { makeAutoObservable } from 'mobx';

class SettingsStore {
  constructor(loading = false) {
    this.loading = loading;
    this.content = { data: [] }
    makeAutoObservable(this);
  }

  getOptionValue(optionName) {
    const option = this.content.data.find(o => o => o.option_name === optionName);
    return option ? option['option_value'] : null;
  }

  isBuyingEnable() {
    const value = this.getOptionValue('is_buying_enable');
    return value && value > 0;
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

export default new SettingsStore();
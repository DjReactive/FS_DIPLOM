import { makeAutoObservable } from 'mobx';

class NoticeStore {
  noticeId = null;
  animation = false;
  visible = false;

  constructor() {
    makeAutoObservable(this);
  }

  error(msg) { this._createNotice(msg, "error") }

  warning(msg) { this._createNotice(msg, "warning") }

  info(msg) { this._createNotice(msg, "info") }

  accept(msg) { this._createNotice(msg, "info") }

  _createNotice(msg, type) {
    this.message = msg || "";
    this.type = type || "info";
    if (this.noticeId) {
      this.noticeId = null;
      this._setAnimation(false);
    }
    this._setVisible(true);
    this._setAnimation(true);
    this.noticeId = setTimeout(() => this._setVisible(false), 3000);
  }

  _setVisible(state = false) {
    this.visible = state;
  }
  _setAnimation(state = false) {
    this.animation = state;
  }

}

export default new NoticeStore();

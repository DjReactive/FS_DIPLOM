// Переделать!!!
// Убрать отсюда все компоненты форм, т.к. невозможно выполнить onSubmit
// Перенести их в компоненты, где происходит вызов данных Popup
// import AddMovie from '../../components/admin/popup/AddMovie';
// import AddShowTime from '../../components/admin/popup/AddShowTime';
// import DeleteHall from '../../components/admin/popup/DeleteHall';
// import DeleteShowTime from '../../components/admin/popup/DeleteShowTime';
import { makeAutoObservable } from 'mobx';

class PopupStore {
  visible = false;

  constructor() {
    makeAutoObservable(this);
  }

  close(e) {
    e.preventDefault();
    this.visible = false;
  }

  create(title, Popup, data = null) {
    this.title = title;
    this.visible = true;
    this.form = <Popup data={data} />
  }
}

export default new PopupStore();

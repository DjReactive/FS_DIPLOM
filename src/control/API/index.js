import MovieModel from './model/MovieModel'
import HallModel from './model/HallModel'
import AuthModel from './model/AuthModel'
import TicketModel from './model/TicketModel'
import ShowTimeModel from './model/ShowTimeModel'
import SettingsModel from './model/SettingsModel'
import { stores } from '../store'

class API {
  location = `${process.env.REACT_APP_SERVER_URL}/api`;

  constructor() {
    this.store = {
      user: stores.userStore,
      hall: stores.hallStore,
      notice: stores.noticeStore,
      movies: stores.moviesStore,
      showtime: stores.showtimeStore,
      tickets: stores.ticketsStore,
      popup: stores.popupStore,
      settings: stores.settingsStore,
    }

    this.errorFnc = err => err && this.store.notice.error(err);
    this.warningFnc = wrn => wrn && this.store.notice.warning(wrn);
    this.acceptFnc = msg => msg && this.store.notice.accept(msg);

    let options = {
      location: this.location,
      errorClb: this.errorFnc,
      acceptClb: this.acceptFnc,
    }

    this.HallModel = new HallModel(options);
    this.MovieModel = new MovieModel(options);
    this.AuthModel = new AuthModel(options);
    this.TicketModel = new TicketModel(options);
    this.ShowTimeModel = new ShowTimeModel(options);
    this.SettingsModel = new SettingsModel(options);
  }

  LoadContent() {
    this.Hall.getall();
    this.Movies.getall();
    this.ShowTimes.getall();
    this.Settings.access();
  }

  responseAlert(response, succesMsg = "", updater = () => {}) {
    response.error ? 
      this.errorFnc(response.error) : this.acceptFnc(succesMsg);
    !response.error && updater();

    return response;
  }

  // =============== Hall API =================
  Hall = {
    getall: () =>
      this.store.hall.getting(this.HallModel.readAll(), this.errorFnc),

    add: (data) =>
      this.HallModel.create(data)
        .then(res =>
          this.responseAlert(res, `Зал ${data.name} был успешно добавлен`, this.Hall.getall)),

    remove: (id) =>
      this.HallModel.delete(id)
        .then(res =>
          this.responseAlert(res, `Зал #${id} был успешно удален`, this.Hall.getall)),

    update: (id, data) =>
      this.HallModel.update(id, data)
        .then(res =>
          this.responseAlert(res, `Сохранение прошло успешно!`, this.Hall.getall)),
  }


  // =============== Movies API =================
  Movies = {
    getall: () =>
      this.store.movies.getting(this.MovieModel.readAll(), this.errorFnc),
      
    add: (data, file = null) =>
      this.AuthModel.upload(file)
        .then(res => {
          if (res.error) return;

          return this.MovieModel.create(data)
            .then(res =>
              this.responseAlert(res, `Фильм "${data.name}" был успешно добавлен`, this.Movies.getall));
        }),
    remove: (id) =>
      this.MovieModel.delete(id)
        .then(res =>
          this.responseAlert(res, `Фильм успешно удален`, this.Movies.getall)),

    update: (id, data) =>
      this.MovieModel.update(id, data)
        .then(res =>
          this.responseAlert(res, `Информация о фильме обновлена!`, this.Movies.getall)),
  }

  // =============== ShowTimes API =================
  ShowTimes = {
    getall: () =>
      this.store.showtime.getting(this.ShowTimeModel.readAll(), this.errorFnc),
      
    add: (data) =>
      this.ShowTimeModel.create(data)
        .then(res =>
          this.responseAlert(res, `Сеанс был успешно добавлен`, this.ShowTimes.getall)),

    remove: (id) =>
      this.ShowTimeModel.delete(id)
        .then(res =>
          this.responseAlert(res, `Сеанс успешно удален`, this.ShowTimes.getall)),
  }

  // =============== ShowTimes API =================
  Tickets = {
    getAll: (data) =>
      this.store.tickets.getting(this.TicketModel.readAll(data), this.errorFnc),

    get: (id) => 
      this.store.tickets.getting(this.TicketModel.read(id), this.errorFnc),

    getQRCode: (id) => 
      this.store.tickets.getQRCode(this.TicketModel.getQR(id), this.errorFnc),
      
    add: (data) =>
      this.TicketModel.create(data)
        .then(res =>
          this.responseAlert(res, `Вы успешно приобрели билет(ы). Спасибо за покупку!`, this.TicketModel.getall)),

    remove: (id) =>
      this.TicketModel.delete(id)
        .then(res =>
          this.responseAlert(res, `Сеанс успешно удален`, this.TicketModel.getall)),
  }

  Settings = {
    getall: () =>
      this.store.settings.getting(this.SettingsModel.getAll(), this.errorFnc),

    update: (option, value, access = 3) =>
      this.AuthModel.updateSettings(this.store.user.getToken(), option, value, access, this.errorFnc)
        .then(res =>
          this.responseAlert(res, `Настройки сохранены!`, this.Settings.getall)),

    access: () =>
      this.store.settings.getting(this.SettingsModel.access(), this.errorFnc),
  }

  // =============== User API =================
  User = {
    setData: (prop, data) =>
      this.store.user.setData(prop, data),
      
    getData: (prop) =>
      this.store.user.getData(prop),

    removeData: (prop) =>
      this.store.user.removeData(prop),
  }

  Authorize({email, password}) {
    this.store.user.login(this.AuthModel.login({email, password}, this.errorFnc))
      .then(isAuth =>
        isAuth && this.acceptFnc('Вы успешно авторизовались'));
  }

  Logout(user, token) {
    this.store.user.logout(this.AuthModel.logout(token, this.errorFnc))
      .then(isAuth =>
        isAuth && this.acceptFnc(`${user.name} вы успешно вышли!`));
  }

  CheckAuthUser() {
    this.AuthModel.me(stores.userStore.getToken(), this.errorFnc)
      .then(response => response.error && this.store.user.clear());
  }
}

export default new API();

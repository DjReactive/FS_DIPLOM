import { createContext, useContext } from 'react';
import halls from './halls'
import notice from './notice'
import movies from './movies'
import user from './user'
import popup from './popup'
import showtimes from './showtimes';
import tickets from './tickets';
import settings from './settings';

export const stores = {
  // Хранилище данных о залах
  hallStore: halls,
  // Функциональное хранилище, которое позволяет анимированно отображать оповещения
  noticeStore: notice,
  // Хранилище модального окна, которое не допустит отображения нескольких
  popupStore: popup,
  // Хранилище данных о всех фильмах
  moviesStore: movies,
  // Информация о пользователе
  userStore: user,
  // Хранилище всех сеансов кинотеатра
  showtimeStore: showtimes,
  // Хранилище всех приобретенных билетов
  ticketsStore: tickets,
  // Хранит все настройки сайта
  settingsStore: settings,
}

// ContextStore
export const StoreContext = createContext(stores);

export function useStore(callback) {
    return callback(useContext(StoreContext));
}

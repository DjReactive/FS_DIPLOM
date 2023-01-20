import noImage from '../resources/i/no-image.png'
import { CINEMA_TIME_START, CINEMA_TIME_END } from './constants'

/*
  fnc getNearWeek(): Функция возвращает предстояющую неделю, включая сегодняшний день.
  Формат возрвращения (array): [{
    @day => int: число месяца
    @dayweek => string: две буквы дня недели
    @month => string: три буквы месяца
    @isWeekend => bool: выходной сегодня или нет
  }]
*/
export function getNearWeek(count) {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const date = new Date();
  let array = [];
  for(let i = 0; i < count; i++) {
    array.push({
      fulldate: new Date(date),
      day: date.getDate(),
      dayweek: ucFirst(days[date.getDay()]),
      month: months[date.getMonth()],
      isWeekend: (date.getDay() === 0 || date.getDay() === 6),
    });
    date.setDate(date.getDate() + 1);
  }
  return array;
}
/**
  Функция преобразовывает первую букву в строчке и делает ее заглавной
*/
export function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Функция создает таблицу из массивов M x N, с содержимым ячеек: index: NN, value: NN
  @tableValues массив значений для создаваемой таблицы
 */
export function createTable(rows, columns, tableValues = []) {
  const noValue = rows * columns !== tableValues.length;
  let rowsArr = [];
  let index = 1;
  for (let i = 0, k = 0; i < rows; i++) {
    let colArr = [];
    for (k = 0; k < columns; k++) {
      colArr.push({
        index,
        value: noValue ? 0 : tableValues[index-1].type
      });
      index++;
    }
    rowsArr.push(colArr);
  }
  return rowsArr;
}

// export function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

/**
  * Функция возвращает массив с данными каждой ячейки таблицы с elementID
  @elementId id элемента блока с таблицей
  @selector селектор ячеек таблицы
*/
export function getArrayOnHtmlTable(elementId, selector) {
  let arr = [];
  document.getElementById(elementId)
    .querySelectorAll(selector)
      .forEach(o =>
        arr.push({
          index: Number(o.dataset.id),
          type: Number(o.dataset.type)
        })
      );
  return arr;
}

/*
  Функция проверяет директорию нахождения изображения по указанному пути imgPath, в случае чего
  возвращает альтернативу "пустому" изображению
*/
export function getImage(imgPath) {
  try {
    console.log(imgPath);
    return require(`${imgPath}`);
   } catch (err) {
    return noImage;
   }
}

/**
 * Функция преобразовывает длину фильма 100 мин в объект { hours: 1, minutes: 40 }
 * @param {*} duration - длина фильма
 */
export function getDurationToTime(duration) {
  const hours = Math.floor(duration / 60);
  return {
    hours,
    minutes: duration - (hours * 60),
  }
}

/**
 * Функция помогает разобрать время "10:00" (string) в формат { hours: 10, minutes: 0 } (obj)
 * @param {*} value время, которое необходимо обратить в массив
 * @return {*} hours, minutes
 */
export function getTimeObj(value) {
  const [hours, minutes] = value.split(':');
  return { 
    hours: Number(hours), 
    minutes: Number(minutes),
  }
}

/**
 * Функция помогает преобразовать 10 (int) в формат "10:00"
 * @param {*} время в формате INT
 */
 export function getTimeToString(h = 0, min = 0) {
  const strMin = String(min < 10 ? `0${min}` : min);
  const strH = String(h < 10 ? `0${h}` : h);
  return strH + ":" + strMin;
}

/**
 * Функция возвращает массив с датами старта и окончания сеанса
 * @param {*} start_time время начала фильма
 * @param {*} len продолжительность фильма
 */
export function getDateStartEnd(start_time, len) {
  const start_date = new Date();
  start_date.setHours(start_time.hours, start_time.minutes);

  const end_date = new Date(start_date);
  end_date.setMilliseconds(len * 60 * 1000);

  return [start_date, end_date];
}

/**
  * Функция расчитывает отступ по временной шкале сеансов
  * начиная со START до END по часам,
  @maxLength длина всего временного блока, из чего производится расчет
  @value время, которое необходимо расчитать
*/
export function getLengthOnShowTime(maxLength, value = "00:00") {
  const timeLen = { start: CINEMA_TIME_START, end: CINEMA_TIME_END }  // starts on 10:00, ends on 23:00
  const pxInMin = maxLength / ((timeLen.end - timeLen.start) * 60);

  const time = getTimeObj(value);
  if (time.hours < timeLen.start || time.hours >= timeLen.end) return null;

  return ((time.hours - timeLen.start) * 60 + time.minutes) * pxInMin;
}

/**
 * Функция позволяет определить, может ли быть добавлен сеанс с showTime и продолжительностью Len
 * в ленту сеансов (чтобы отсечь возможное пересечение фильмов друг с другом)
 * @param {*} Time - время нового сеанса
 * @param {*} Len - продолжительность фильма
 * @param {*} Movies - массив со всеми фильмами
 * @param {*} AllShowTimes - массив со всеми текущими сеансами зала
 */
export function checkShowTimeOnMovie(Time, Len, Movies, AllShowTimes) {
  let MoviesShowTime = [];
  const currentTime = getTimeObj(Time);
  const [start_date, end_date] = getDateStartEnd(currentTime, Len);
  // Получает информацию о фильме по ID
  const getMovie = movieId => 
    Movies.find(o => o.id === movieId) || {};

  // Проверка, накладывается ли старт нового сеанса на тот, что уже имеется
  const isOverlay = (date, movieTime) => date >= movieTime.start_time && date <= movieTime.end_time;

  AllShowTimes.forEach(o => {
    const movie = getMovie(o.movie_id);
    const time = getTimeObj(o.start_time);
    const [start_date, end_date] = getDateStartEnd(time, movie.duration);

    // Создаем новый массив с сеансами: когда начало, когда конец, и какой фильм
    MoviesShowTime.push({
      start_time: start_date,
      movie_name: movie.name,
      end_time: end_date
    })
  })

  // Проходимся по всем сеансам в текущем зале
  for (let i = 0; i < MoviesShowTime.length; i++) {
    const showtime = MoviesShowTime[i];

    // Проверяем, если старт нового сеанса накладывается на один из существующих
    if (isOverlay(start_date, showtime)) return false;
    // Проверяем, если окончание нового сеанса накладывается на один из существующих
    if (isOverlay(end_date, showtime)) return false;
  }

  return true;
}

/**
 * Функция позволяет преобразовать аргументы из URL строки в необходимые форматы данных
 * @param {*} URLSearchParams 
 * @returns obj
 */
export function getEncodeURLParams(URLSearchParams) {
  let obj = {};
  for (let [key, value] of URLSearchParams.entries()) {
    switch(key) {
      case 'movie_id':
      case 'hall_id':
        obj[key] = Number(value);
        break;
      default: 
        obj[key] = value;
        break;
    }
  }
  return obj;
}

/**
 * Фукнция позволяет определить, есть ли среди имеющихся в массиве arrayTaken мест, которые
 * уже заняты
 * @param {*} places array [1, 2, 3]
 * @param {*} arrayTaken array [[1, 2], [3, 4]]
 */
export function checkPlacesOnShowtime(places, arrayTaken) {
  let oneArr = [];
  const setValuesToArr = arr => {
    oneArr = [...oneArr, ...arr]
  }
  arrayTaken.forEach(o => setValuesToArr(o));
  return oneArr.some(o => places.some(p => p === o));
}

/**
 * Функция позволяет получить backGround у определенного фильма из списка
 * @param {*} movieName 
 * @returns 
 */
export function getBackgroundOnMovie(movieName) {
  const divMovies = document.querySelector('.conf-step__movies');

  if (!divMovies) return;
  const movieElements = divMovies.querySelectorAll('.conf-step__movie');

  for (const el of movieElements) {
    if (el.innerText.indexOf(movieName) > -1)
      return getComputedStyle(el).backgroundColor;
  }
  return "rgb(0, 244, 244)";
}

/**
 * Функция проверяет входящий аргумент на возможность итерации
 */
export function isIterable(input) {  
  if (input === null || input === undefined) {
    return false
  }

  return typeof input[Symbol.iterator] === 'function'
}
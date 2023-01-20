import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../../control/store'
import PopupSubmit from './PopupSubmit';
import API from '../../../control/API';
import { getTimeToString, checkShowTimeOnMovie } from '../../../control/functions';
import { CINEMA_TIME_START, CINEMA_TIME_END } from '../../../control/constants'

export default function AddShowTime({ data: {filmId, name, duration, movies, showTimes} }) {
  const [halls, popup] = useStore(store => [store.hallStore.content.data, store.popupStore]);
  const [form, setForm] = useState({ movie_id: filmId });
  const [load, setLoad] = useState(false);
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const start = getTimeToString(CINEMA_TIME_START);
  const end = getTimeToString(CINEMA_TIME_END);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
  
    setLoad(true);
    API.ShowTimes.add(form)
      .then((res) => {
        setLoad(false);
        setForm({ movie_id: filmId });
        if (!res.error) popup.close(e);
      });
  }

  useEffect(() => {
    selectRef.current.setCustomValidity(
      (!form.hall_id || form.hall_id < 0) ? "Необходимо выбрать нужный зал" : ""
    );
  }, [form]);

  useEffect(() => {
    const showTimesArr = showTimes.filter(o => o.hall_id === Number(form.hall_id));

    inputRef.current.setCustomValidity(
      (!form.start_time || !checkShowTimeOnMovie(form.start_time, duration, movies, showTimesArr)) ?
      "Такое время для сеанса невозможно установить" : ""
    );
  }, [form, showTimes]);

  return (
    <form action="add_movie" onSubmit={handleSubmit} acceptCharset="utf-8">
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="hall_id" onChange={handleChange}>
        Выберите зал
        <select className="conf-step__input" name="hall_id" onChange={handleChange} ref={selectRef} required>
          <option value="-1">Не выбран</option>
          {
            halls.map(o => <option key={o.id} value={o.id}>{o.name}</option>)
          }
        </select>
      </label>
      
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="start_time">
        Время начала c {start} до {end}
        <input className="conf-step__input" type="time" value={form.start_time || "00:00"} name="start_time"
          ref={inputRef} onChange={handleChange} min={start} max={end} required />
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
        Выбранный фильм
        <input className="conf-step__input" type="text" value={`${name} (${duration} мин)`} name="name" disabled />
      </label>
      <span className="buying__info-custom custom-warning">Учитывайте длительность фильма при добавлении сеанса</span>

      <PopupSubmit bname="Добавить сеанс" loading={load} />
    </form>
  )
}
// ПРОБЛЕМА С ПРОВЕРКОЙ НА ВРЕМЯ ДОБАВЛЕНИЯ СЕАНСА. НЕ ПРОВЕРЯЕТ, ЧТО ФИЛЬМ НА ФИЛЬМ НАКЛАДЫВАЕТСЯ
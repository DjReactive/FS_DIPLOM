import { useState } from 'react';
import PopupSubmit from './PopupSubmit';
import API from '../../../control/API';

export default function AddHall() {
  const [form, setForm] = useState({});
  const [load, setLoad] = useState(false);
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setLoad(true);

    API.Hall.add(form)
      .then((res) => {
        setLoad(false);
        if (!res.error) API.store.popup.close(e);
      });
  }
  return (
    <form action="add_hall" onSubmit={handleSubmit} acceptCharset="utf-8">
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
        Название зала
        <input className="conf-step__input" type="text"
          onChange={handleChange} minLength="3"
          pattern='^[a-zA-ZА-Яа-я0-9Ёё\s]+$'
          placeholder="Например, &laquo;Зал 1&raquo;" name="name" required />
      </label>
      <PopupSubmit bname="Добавить зал" loading={load} />
    </form>
  )
}

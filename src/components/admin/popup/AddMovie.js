import { useState } from 'react';
import PopupSubmit from './PopupSubmit';
import API from '../../../control/API';

export default function AddMovie() {
  const [form, setForm] = useState({ duration: 120 });
  const [load, setLoad] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setLoad(true);

    API.Movies.add(form)
      .then((res) => {
        setLoad(false);
        if (!res.error) API.store.popup.close(e);
      });
  }
  const clickUpload = e => {
    e.preventDefault();
    const input = document.getElementById('upload-image');
    input.dispatchEvent(new MouseEvent('click'));
  }
  const handleUploadImage = e => {
    (async() => {
      console.log('загружаю');
      const file = await e.currentTarget.files[0];
      console.log('получено');
      console.log(e.target.accept, file.type)
    })();
  }

  return (
        <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={handleSubmit}>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
            Название фильма
            <input className="conf-step__input" type="text"
              onChange={handleChange}
              placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="name" required />
          </label>

          <label className="conf-step__label conf-step__label-fullsize" htmlFor="description">
            Описание к фильму
            <textarea onChange={handleChange} className="conf-step__input" name="description" required />
          </label>

          <label className="conf-step__label conf-step__label-fullsize" htmlFor="country">
            Страна
            <input className="conf-step__input" onChange={handleChange}
              type="text" name="country" required />
          </label>

          <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration">
            Продолжительность (мин.)
            <input className="conf-step__input" type="number" defaultValue="120"
              onChange={handleChange}
              min="10" max="320" name="duration" required />
          </label>

          <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
            Добавьте изображение к фильму
            <input className="conf-step__input" type="file" accept="image/*"
            onChange={handleUploadImage} 
              id="upload-image" name="image" />
            <button className="conf-step__button conf-step__button-accent"
              onClick={clickUpload}>Загрузить</button>
          </label>
          <PopupSubmit bname="Добавить фильм" loading={load} />
        </form>
  )
}

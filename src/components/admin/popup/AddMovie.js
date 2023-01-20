import { useState } from 'react';
import PopupSubmit from './PopupSubmit';
import API from '../../../control/API';
import BlobFiles from '../../../control/blob';
import noImage from '../../../resources/i/no-image.png'

export default function AddMovie() {
  const [img, setImg] = useState({});
  const [form, setForm] = useState({ duration: 120 });
  const [load, setLoad] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setLoad(true);
console.log(img.file);
    API.Movies.add(form, img.file)
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
  const handleUploadImage = async e => {
      console.log('загружаю');
      const file = await e.currentTarget.files[0];
      console.log('получено');

      const blob = await BlobFiles.fileToBlob(file);

      if (blob.type.includes('image/')) {
        const url = URL.createObjectURL(blob);
        setImg({ file, url, blob });
      } else {
        API.warningFnc('Выбран неправильный формат изображения, попробуйте снова');
      }
  }

  const handleRemove = () => setImg({}); 

  return (
        <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={handleSubmit}>
          <div className="conf-step__add-movie-block">
            <div>
              {
                <div className="conf-step__movie-image">
                  <div className="block-image" 
                    style={{
                      backgroundImage: `url(${img.url || noImage})`,
                      backgroundColor: "#000",
                      backgroundPosition: "center center",
                      backgroundSize: "100% auto",
                      backgroundRepeat: "no-repeat",
                    }}>
                  </div>
                  {
                    img.url && <span onClick={handleRemove}>X</span>
                  }
                </div>
              }
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                <input className="conf-step__input" type="file" accept="image/*"
                onChange={handleUploadImage} 
                  id="upload-image" name="upload-image" style={{display: "none"}} />
                <button className="conf-step__button conf-step__button-accent"
                  onClick={clickUpload}>Загрузить</button>
              </label>
            </div>
            <div>
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
            </div>
          </div>
          <PopupSubmit bname="Добавить фильм" loading={load} />
        </form>
  )
}

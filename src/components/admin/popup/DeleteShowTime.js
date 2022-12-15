import { useState } from 'react'
import PopupSubmit from './PopupSubmit';
import popup from '../../../control/store/popup'
import API from '../../../control/API';

export default function DeleteShowTime({ data }) {
  const [load, setLoad] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();

    setLoad(true);

    API.ShowTimes.remove(data.id)
      .then((res) => {
        setLoad(false);
        if (!res.error) popup.close(e);
      });
  }
  return (
      <form acceptCharset="utf-8" onSubmit={handleSubmit}>
        <p className="conf-step__paragraph">Вы действительно хотите снять с сеанса фильм <span>{data.movie_name}</span> в {data.start_time}?</p>
        <PopupSubmit bname="Удалить сеанс" loading={load} />
      </form>
  )
}

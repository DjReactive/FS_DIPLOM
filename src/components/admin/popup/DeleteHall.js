import React from 'react'
import { useState } from 'react'
import PopupSubmit from './PopupSubmit';
import popup from '../../../control/store/popup'
import API from '../../../control/API';

export default function DeleteHall({data: { name, id } }) {
  const [load, setLoad] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setLoad(true);

    API.Hall.remove(id)
      .then((res) => {
        setLoad(false);
        if (!res.error) popup.close(e);
      });
  }
  return (
    <form action="delete_hall" onSubmit={handleSubmit} acceptCharset="utf-8">
      <p className="conf-step__paragraph">Вы действительно хотите удалить зал <span>{name}</span>?</p>
      <PopupSubmit bname="Удалить зал" loading={load} />
    </form>
  )
}

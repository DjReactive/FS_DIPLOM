import React from 'react';
import AddHall from './popup/AddHall';
import DeleteHall from './popup/DeleteHall'
import PreLoader from '../global/PreLoader'
import SectorHeader from './SectorHeader'
import { useStore } from '../../control/store'
import { observer } from 'mobx-react-lite';

const EditHall = observer(() => {
  const [halls, popup] = useStore(store => [store.hallStore, store.popupStore]);
  const {data, error} = halls.content || { data: [], error: null };
  const handleClick = () => popup.create("Создание зала", AddHall);
  const handleRemove = e => popup.create("Удаление зала", DeleteHall, {
    id: e.target.dataset.id,
    name: e.target.dataset.name,
  });
  const loadComplete = !halls.loading && !error && data;
  return (
    <section className="conf-step">
      <SectorHeader>Управление залами</SectorHeader>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <PreLoader load={halls.loading} error={error} />
        <ul className="conf-step__list">
          { loadComplete && data.map(o =>
            <li key={o.name}>
              {o.name}
              <button className="conf-step__button conf-step__button-trash"
              onClick={handleRemove}
                data-id={o.id} data-name={o.name}></button>
            </li>
          )}
        </ul>
        <button className="conf-step__button conf-step__button-accent" onClick={handleClick}>Создать зал</button>
      </div>
    </section>
  )
});

export default EditHall;

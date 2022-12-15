import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../control/store'
import { getArrayOnHtmlTable } from '../../control/functions'
import PreLoader from '../global/PreLoader'
import AdminHallWrapper from './hall/AdminHallWrapper';
import HallLegend from './hall/HallLegend';
import SectorHeader from './SectorHeader';
import HallList from './hall/HallList'
import API from '../../control/API'

const ConfigHall = observer(() => {
  const halls = useStore(store => store.hallStore);
  const [form, setForm] = useState(null);
  const [load, setLoad] = useState(false);

  const handleCancel = () => {};
  const handleChange = ({target}) => {
    const obj = { [target.name]: target.value };
    halls.current.id && halls.setTable(obj);
    setForm(prev => ({ ...prev, ...obj }));
  }
  const handleSave = e => {
    setLoad(true);
    API.Hall.update(halls.current.id, {
      ...form,
      seats_table: JSON.stringify(
        getArrayOnHtmlTable('hall-table', '.conf-step__chair')
      ),
    }).then(() => setLoad(false));
  };

  useEffect(() => {
    const { rows, seats_on_row, seats_table } = halls.current;
    setForm(halls.current.id ? { rows, seats_on_row, seats_table } : null);
  }, [halls.current]);

  return (
      <section className="conf-step">
          <SectorHeader>Конфигурация зала</SectorHeader>
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <HallList halls={halls} name="config-hall" />
            { form && <>
              <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
              <div className="conf-step__legend">
                <label className="conf-step__label">Рядов, шт
                  <input type="number" className="conf-step__input"
                    value={form.rows || 8} max="20" min="8"
                    onChange={handleChange} name="rows" />
                </label>
                <span className="multiplier">x</span>
                <label className="conf-step__label">Мест, шт
                  <input type="number" className="conf-step__input"
                    value={form.seats_on_row || 8} max="20" min="8"
                    onChange={handleChange} name="seats_on_row" />
                </label>
              </div>
              <HallLegend />
              <AdminHallWrapper current={form} />
              { !load ?
                <fieldset className="conf-step__buttons text-center">
                  <button className="conf-step__button conf-step__button-regular"
                    onClick={handleCancel}>Отмена</button>
                  <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"
                    onClick={handleSave}/>
                </fieldset>
                : <PreLoader load={true} />
              }
              </>
            }
          </div>
      </section>
  )
});

export default ConfigHall;

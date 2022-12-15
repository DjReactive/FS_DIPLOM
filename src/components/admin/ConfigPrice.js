import { useState, useEffect } from 'react'
import PreLoader from '../global/PreLoader'
import SectorHeader from './SectorHeader'
import HallList from './hall/HallList'
import { useStore } from '../../control/store'
import { observer } from 'mobx-react-lite'
import API from '../../control/API'

const ConfigPrice = observer(() => {
  const halls = useStore(store => store.hallStore);
  const [form, setForm] = useState(null);
  const [load, setLoad] = useState(false);
  const handleChange = ({target}) =>
    setForm(prev => ({ ...prev, [target.name]: Number(target.value) }));

  const handleSave = e => {
    e.preventDefault();
    setLoad(true);
    console.log(form);
    API.Hall.update(halls.current.id, form)
      .then(() => setLoad(false));
  }

  useEffect(() => {
    const { price, vip_price } = halls.current;
    setForm(halls.current.id ? { price, vip_price } : null);
  }, [halls.current]);

  return (
    <section className="conf-step">
      <SectorHeader>Конфигурация цен</SectorHeader>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <HallList halls={halls}  name="config-price" />
        { form && <>
          <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей
              <input type="number" className="conf-step__input" placeholder="0"
                id="config_price"
                value={form.price || 100}
                min="0" name="price" onChange={handleChange} />
            </label>
            за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
          </div>
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей
              <input type="number" className="conf-step__input" placeholder="0"
                id="config_vip_price"
                value={form.vip_price || 150}
                min="0" name="vip_price" onChange={handleChange} />
            </label>
            за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
          </div>
          { !load ?
              <fieldset className="conf-step__buttons text-center">
                <button className="conf-step__button conf-step__button-regular">Отмена</button>
                <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"
                  onClick={handleSave} />
              </fieldset>
              : <PreLoader load={true} />
          }
          </>
        }
      </div>
    </section>
  )
});

export default ConfigPrice;

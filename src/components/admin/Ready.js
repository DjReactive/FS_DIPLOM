import { Fragment } from 'react'
import { observer} from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../control/store';
import PreLoader from '../global/PreLoader';
import API from '../../control/API';


const Ready = observer(() => {
  const [halls, movies, showtimes, settings] = useStore(store => [
    store.hallStore.content.data,
    store.moviesStore.content.data,
    store.showtimeStore.content.data,
    store.settingsStore,
  ]);
  const isBuying = settings.isBuyingEnable();
  const btnName = isBuying ? 'Закрыть продажу' : 'Открыть продажу билетов';
  const [load, setLoad] = useState(false);

  const ready = [
    {
      len: halls.length,
      error: 'не добавлено ни одного зала',
    },
    {
      len: movies.length,
      error: 'не добавлено ни одного фильма',
    },
    {
      len: showtimes.length,
      error: 'не добавлено ни одного сеанса',
    },
  ];

  const handleOpenPay = e => {
    setLoad(true);
    API.Settings.update('is_buying_enable', !isBuying, 0)
      .then(() => setLoad(false));
  }

  return (
    <section className="conf-step">
      <header className="conf-step__header conf-step__header_opened">
        <h2 className="conf-step__title">Открыть продажи</h2>
      </header>
      <div className="conf-step__wrapper text-center">
        {
          ready.every(o => o.len > 0) ?
          <Fragment>
            <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
            {
              load ? 
                <PreLoader load={true} /> : 
                <button className="conf-step__button conf-step__button-accent" 
                  onClick={handleOpenPay}>{btnName}</button>
            }
          </Fragment> :
          <Fragment>
            <p className="conf-step__paragraph">Чтобы открыть продажу билетов, исправьте следующее:</p>
            <ul>
              {
                ready.map(o => o.len < 1 &&
                  <li key={o.error}>{o.error}</li>
                )
              }
            </ul>
          </Fragment>
        }
      </div>
    </section>
  )
});

export default Ready;

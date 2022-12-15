import { useState, createContext } from 'react'
import { observer } from 'mobx-react-lite'
import CinemaContainer from '../components/CinemaContainer';
import PreLoader from '../components/global/PreLoader'
import NavDate from '../components/NavDate';
import { useStore } from '../control/store';
import { getNearWeek } from '../control/functions';

export const MainContext = createContext(null);

const Main = observer(() => {
  const dates = getNearWeek(14);
  const [date, setDate] = useState(dates[0]);
  const [movies, settings] = useStore(store => [
    store.moviesStore,
    store.settingsStore,
  ]);

  return (
    <MainContext.Provider value={{ date, setDate }}>
      <NavDate dates={dates} setDate={setDate} />
      <PreLoader load={movies.loading} error={movies.content.error || null} />
      { (!movies.loading && !movies.content.error && movies.content.data.length < 1) &&
        <div className="ticket__info-wrapper">
          Фильмов не найдено для показа
        </div>
      }
      { !settings.loading && !settings.isBuyingEnable() &&
        <div className="ticket__info-wrapper">
          <span className="buying__info-custom custom-warning">К сожалению, продажа билетов временно прекращена.</span>
        </div>
      }
      <CinemaContainer movies={movies.content.data || []} />
    </MainContext.Provider>
  );
});

export default Main;

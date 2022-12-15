import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom';
import { getTimeObj } from '../control/functions';
import { MainContext } from '../pages/Main';
import { useStore } from '../control/store';

const MovieOnHall = observer(({ hall, movie_id, showtimes }) => {
  const route = '/choice';
  const settings = useStore(store => store.settingsStore);
  const { date } = useContext(MainContext);
  const isEnable = settings.isBuyingEnable();
  const getUrl = ({hall_id, movie_id, start_time}) => 
    new URLSearchParams({ hall_id, movie_id, start_time, timestamp: date.fulldate.setHours(0,0,0,0) });

  const hallShowTimes = 
    showtimes.content.data
      .filter(o => o.hall_id === hall.id && movie_id === o.movie_id)
      .map(o => ({ ...o, url: getUrl(o) }))
      .sort((a, b) => {
        const a_time = getTimeObj(a.start_time);
        const b_time = getTimeObj(b.start_time);

        return (a_time.hours < b_time.hours) ? -1 : 1;
      });

  return (
    <div className="movie-seances__hall">
      <h3 className="movie-seances__hall-title">{hall.name}</h3>
      {
        hallShowTimes.length > 0 ?
          <ul className="movie-seances__list">
            {
              hallShowTimes.map(o =>
                <li className="movie-seances__time-block" key={o.url}>
                  <Link className="movie-seances__time" to={isEnable ? `${route}?${o.url}` : '#'}>{o.start_time}</Link> 
                </li>     
              )
            }
          </ul>
          : <p>Показ фильма не проходит в данном зале</p>
      }
    </div>
  )
});

export default MovieOnHall;

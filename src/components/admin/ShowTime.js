import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { useStore } from '../../control/store'
import { getLengthOnShowTime } from '../../control/functions';
import DeleteShowTime from './popup/DeleteShowTime';

const ShowTime = observer(({hall, showtimes, movies}) => {
  const popup = useStore(store => store.popupStore);
  const [movieStime, setMovieStime] = useState([]);

  useEffect(() => {
    setMovieStime(
      showtimes
      .filter(o => o.hall_id === hall.id)
      .map(o => {
          const len = getLengthOnShowTime(700, o.start_time);
          const movie = movies.find(movie => movie.id === o.movie_id);
          if (len !== null && movie) 
            return { ...o, len, movie_name: movie.name }
      })
      .sort((a, b) => a.start_time < b.start_time)
    )
  }, [showtimes, movies, hall])

  const handleRemove = e => 
    popup.create("Удаление сеанса", DeleteShowTime, 
      movieStime.find(o => Number(e.currentTarget.dataset.id) === o.id));

  return (
    <div className="conf-step__seances-hall">
      <h3 className="conf-step__seances-title">{hall.name}</h3>
      <div className="conf-step__seances-timeline">
        {
          movieStime.map(o =>
            <div className="conf-step__seances-movie" key={o.start_time} onClick={handleRemove}
              data-id={o.id}
              style={{width: 60+'px', backgroundColor: 'rgb(133, 255, 137)', left: o.len+'px'}}>
              <p className="conf-step__seances-movie-title">{o.movie_name}</p>
              <p className="conf-step__seances-movie-start">{o.start_time}</p>
            </div>
          )
        }
      </div>

    </div>
  );
})

export default ShowTime;
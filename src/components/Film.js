import MovieOnHall from './MovieOnHall'
import { observer } from 'mobx-react-lite'
import { useStore } from '../control/store';
import { getImage, getDurationToTime } from '../control/functions'

const Film = observer(({info}) => {
  const duration = getDurationToTime(info.duration);
  const [halls, showtimes] = useStore(store => [
    store.hallStore,
    store.showtimeStore,
  ]);

  return (
    <section className="movie">
      <div className="movie__info">
        <div className="movie__poster">
          <img className="movie__poster-image" alt="Звёздные войны постер" src={getImage(info.image)} />
        </div>
        <div className="movie__description">
          <h2 className="movie__title">{info.name}</h2>
          <p className="movie__synopsis">{info.description}</p>
          <p className="movie__data">
            <span className="movie__data-duration">{duration.hours}ч. {duration.minutes}мин. ({info.duration} мин)</span>
            <span className="movie__data-origin"> {info.country}</span>
          </p>
        </div>
      </div>
      { halls.content.data.map(o => 
        <MovieOnHall key={o.name}
          movie_id={info.id}
          hall={o}
          showtimes={showtimes}
        />)
      }
    </section>
  )
});

export default Film;

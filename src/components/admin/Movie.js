import { observer } from 'mobx-react-lite'
import p1 from '../../resources/admin/i/poster.png';
import AddShowTime from './popup/AddShowTime';
import DeleteMovie from './popup/DeleteMovie';

const Movie = observer(({data, popup, movies, showTimes}) => {
  const { id, name, duration } = data;

  const handleAddShowTime = () => 
    popup.create("Добавление сеанса", AddShowTime, {
      filmId: id,
      duration,
      name,
      movies,
      showTimes,
    });

  const handleRemove = e => 
    popup.create("Удаление фильма", DeleteMovie, {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
    });

  return (
  <>
    <div className="conf-step__movie" onClick={handleAddShowTime}>
      <img className="conf-step__movie-poster" alt="poster" src={p1} />
      <h3 className="conf-step__movie-title">{name}</h3>
      <p className="conf-step__movie-duration">{duration} минут(ы)</p>
    </div>
    <button className="conf-step__button conf-step__button-trash" onClick={handleRemove}
    data-id={id} data-name={name}>
    </button>
  </>
  )
});

export default Movie;

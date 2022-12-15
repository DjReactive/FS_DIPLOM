import { observer } from 'mobx-react-lite'
import { useStore } from '../../control/store';
import PreLoader from '../global/PreLoader'
import AddMovie from './popup/AddMovie';
import SectorHeader from './SectorHeader'
import ShowTime from './ShowTime';
import Movie from './Movie';
const def = { data: [], error: null }

const ConfigSession = observer(() => {
  const [halls, movies, popup, showtimes] = useStore(store => [
    store.hallStore, 
    store.moviesStore, 
    store.popupStore, 
    store.showtimeStore,
  ]);

  const movieContent = movies.content || def;
  const hallsContent = halls.content || def;
  const showtimeContent = showtimes.content || def;
  const movieCompleteLoad = !movies.loading && !movieContent.error && movieContent.data;
  const hallsCompleteLoad = !halls.loading && !hallsContent.error && hallsContent.data;
  const handleClick = () => popup.create("Добавление фильма", AddMovie);

  return (
    <section className="conf-step">
      <SectorHeader>Сетка сеансов</SectorHeader>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={handleClick}>Добавить фильм</button>
        </p>
        <div className="conf-step__movies">
          <PreLoader load={movies.loading} error={movieContent.error} />
          { movieCompleteLoad &&
              movieContent.data.map(o => 
                <Movie data={o} key={o.name} 
                  popup={popup}
                  movies={movieContent.data}
                  showTimes={showtimeContent.data} />
          )}
        </div>
        <div className="conf-step__seances">
          { hallsCompleteLoad &&
              hallsContent.data.map(o => 
                <ShowTime hall={o} key={o.id}
                  movies={movieContent.data}
                  showtimes={showtimeContent.data} />
          )}
        </div>
      </div>
    </section>
  )
});

export default ConfigSession;

{/* <fieldset className="conf-step__buttons text-center">
<button className="conf-step__button conf-step__button-regular">Отмена</button>
<input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
</fieldset> */}
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import { useStore } from '../control/store'
import { getEncodeURLParams } from '../control/functions'
import { getNearWeek } from '../control/functions';
import HallWrapper from '../components/hall/HallWrapper'
import HallLegend from '../components/hall/HallLegend'
import PreLoader from '../components/global/PreLoader';
import API from '../control/API';

const Choice = observer(() => {
  const navigate = useNavigate();
  const dates = getNearWeek(14);
  const [searchParams] = useSearchParams();
  const params = getEncodeURLParams(searchParams);
  const [seats, setSeats] = useState([]);
  const [tickets, setTickets] = useState(null);

  const [halls, movies, showtimes, ticketStore, settings] = useStore(store => [
    store.hallStore.content.data,
    store.moviesStore.content.data,
    store.showtimeStore.content.data,
    store.ticketsStore,
    store.settingsStore,
  ]);

  // Обнуляем данные о предыдущих выбранных билетах
  API.User.removeData('choice');

  const handlePaymentClick = e => {
    if (!current.hall) return;

    let seatPrice = 0;
    const prices = [0 /*DISABLED*/, current.hall.price, current.hall.vip_price];
    const seatsObj = seats;
    const table = JSON.parse(current.hall.seats_table);

    // Удаляем пустые значения
    Object.entries(seats).forEach(([key, value]) => !value && delete seatsObj[key])
    // Суммируем стоимость всех мест
    table
      .filter(o => seatsObj.includes(o.index))
      .forEach(o => seatPrice += prices[o.type]);

    API.User.setData('choice', {
      showtime: current.showtime,
      date: current.date,
      hall: current.hall,
      movie: current.movie,
      seats: seatsObj,
      price: seatPrice,
    })
    navigate('/payment');
  }

  // переменная current - комплекс проверок входящих параметров на соответствие
  const current = {
    showtime: 
      showtimes.find(o =>
        params.start_time && 
          o.start_time === params.start_time &&
          o.movie_id === Number(params.movie_id) && 
          o.hall_id === Number(params.hall_id)
      ),
    hall: 
      halls.find(o => 
        params.hall_id && 
          o.id === Number(params.hall_id)
      ),
    movie: 
      movies.find(o => 
        params.movie_id && 
          o.id === Number(params.movie_id)
      ),
    date: 
      dates.find(o =>
        params.timestamp &&
          o.fulldate.setHours(0,0,0,0) === Number(params.timestamp)
      ),
  }

  useEffect(() => {
    // Если сеанс не обновился или не был найден, или загруженные из бд билеты были найдены
    if (!current.showtime || !params.timestamp || tickets) return;

    API.Tickets
      .getAll({
        showtime_id: current.showtime.id,
        timestamp: params.timestamp,
      })
      .then(data => setTickets(data));
      
  }, [current.showtime, tickets]);

  // Условие для редиректа на несуществующую страницу, подразумевая ошибочный запрос
  const redirect = (showtimes.length > 0 && !current.showtime) || !current.date || !settings.isBuyingEnable();

  return ( 
    redirect ? <Navigate to='/404' /> :
        <section className="buying">
          <div className="buying__info">
            {
              !current.showtime ? <PreLoader load={true} />  :
              <div className="buying__info-description">
                <h2 className="buying__info-title">{current.movie.name}</h2>
                <p className="buying__info-start">Дата: {new Date(current.date.fulldate).toLocaleDateString()}</p>
                <p className="buying__info-start">Начало сеанса: {current.showtime.start_time}</p>
                <p className="buying__info-hall">{current.hall.name}</p>
              </div>
            }

            <div className="buying__info-hint">
              <p>Тапните дважды,<br />чтобы увеличить</p>
            </div>
          </div>
          <div className="buying-scheme">
            {
              (!current.showtime || ticketStore.loading || !tickets) ? 
                <PreLoader load={true} />  : 
                <HallWrapper 
                  tickets={tickets} 
                  hall={current.hall}
                  state={seats}
                  setState={setSeats}
                />
            }
            <HallLegend hall={current.hall} />
          </div>
          {
            ticketStore.content.error || seats.length < 1 ?
              <span className="buying__info-custom custom-warning">Выберите места для бронирования, прежде чем продолжить</span> :
              <div>
                <span className="buying__info-custom custom-info">Выбраны места: {seats.sort().join(", ")}</span>
                <button className="acceptin-button" onClick={handlePaymentClick}>Забронировать</button>
              </div>
          }
        </section>
  );
});

export default Choice;

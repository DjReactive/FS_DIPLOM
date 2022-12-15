import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { checkPlacesOnShowtime } from '../control/functions';
import PreLoader from '../components/global/PreLoader';
import API from '../control/API';

export default function Payment() {
  const navigate = useNavigate();
  const data = API.User.getData('choice');
  const [load, setLoad] = useState(false);

  const handleSubmit = () => {
    const arr = [];
    const timestamp = (new Date(data.date.fulldate)).getTime()
    setLoad(true);
    API.Tickets
      .getAll({
        showtime_id: data.showtime.id,
        timestamp,
      })
      .then(res => {
        // Объединяем все забронированные места из всех заказов
        res.forEach(o => 
          arr.push(
            Object.values(o.seat_places)
              .map(o => Number(o))
          )
        );
      
        if (checkPlacesOnShowtime(data.seats, arr)) {
          API.warningFnc('К сожалению, одно или несколько мест уже забронированы');
          setLoad(false);
          return;
        }

        // Добавляем новый заказ
        API.Tickets
          .add({
            showtime_id: data.showtime.id,
            start_date: String(timestamp),
            seat_places: JSON.stringify(Object.assign({}, data.seats)),
            cost: data.price,
          })
          .then(res => {
            setLoad(false);
            navigate(`/ticket?uniq_id=${res.ticket_id}`);
          })
      });

  }

  useEffect(() => {
    if (!data || !data.showtime || !data.date) {
      API.warningFnc('У вас нет выбранных билетов');
      navigate('/');
    }
  }, [])

  return (
    !data ? <Navigate to="/" /> :
    <section className="ticket">

      <header className="tichet__check">
        <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
      </header>

      <div className="ticket__info-wrapper">
        <p className="ticket__info">На фильм: 
          <span className="ticket__details ticket__title"> {data.movie.name}</span>
        </p>
        <p className="ticket__info">Места: 
          <span className="ticket__details ticket__chairs"> {data.seats.sort().join(", ")}</span></p>
        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{data.hall.name}</span>
        </p>
        <p className="ticket__info">Дата выбранного сеанса:
          <span className="ticket__details ticket__start"> {new Date(data.date.fulldate).toLocaleDateString()}</span>
        </p>
        <p className="ticket__info">Начало сеанса:
          <span className="ticket__details ticket__start"> {data.showtime.start_time}</span>
        </p>
        <p className="ticket__info">Стоимость: 
          <span className="ticket__details ticket__cost"> {data.price}</span> рублей
        </p>
        {
          load ? 
          <PreLoader load={load} /> : 
          <button className="acceptin-button" onClick={handleSubmit} >Получить код бронирования</button>
        }
        <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
        <p className="ticket__hint">Приятного просмотра!</p>
      </div>
    </section>
  )
}

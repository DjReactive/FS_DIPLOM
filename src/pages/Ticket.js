import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getEncodeURLParams, getTimeObj } from '../control/functions';
import PreLoader from '../components/global/PreLoader';
import API from '../control/API';
// import qr from "../resources/i/qr-code.png";

export default function Ticket() {
  const [searchParams] = useSearchParams();
  const params = getEncodeURLParams(searchParams);
  const [load, setLoad] = useState(true);
  const [img, setImg] = useState({ load: true, img: null });
  const [data, setData] = useState(null);

  const timeOverdue = () => {
    const showtime = new Date(data.start_date);
    const {hours, minutes} = getTimeObj(data.start_time);
    showtime.setHours(hours, minutes + 30);
    return showtime;
  }

  useEffect(() => {
    if (!params.uniq_id) {
      setLoad(false);
      setImg(prev => ({ ...prev, load: false }));
      return;
    }

    if (data) return;

    setLoad(true);
    setImg(prev => ({ ...prev, load: true }));
    API.Tickets
      .get(params.uniq_id)
        .then(data => {
          if(data.length < 1) return;
          setData(data[0]);

          API.Tickets
            .getQRCode(params.uniq_id)
              .then(res => setImg({ load: false, img: res }))
        })
        .then(() => setLoad(false));
  }, [data]);

  return (
    <section className="ticket">

      <header className="tichet__check">
        <h2 className="ticket__check-title">Электронный билет</h2>
      </header>
        <div className="ticket__info-wrapper">
          <PreLoader load={load} />
          { !load && 
            (!data || data.length < 1 ?
            <span className="buying__info-warning">Мы не нашли подходящих билетов.</span> :
            <>
              <p className="ticket__info">На фильм:
                <span className="ticket__details ticket__title"> {data.movie_name}</span>
              </p>
              <p className="ticket__info">Места:
                <span className="ticket__details ticket__chairs"> {Object.values(data.seat_places).sort().join(", ")}
                </span>
              </p>
              <p className="ticket__info">В зале:
                <span className="ticket__details ticket__hall"> {data.hall_name}</span>
              </p>
              <p className="ticket__info">Дата сеанса:
                <span className="ticket__details ticket__start"> {new Date(data.start_date).toLocaleDateString()}</span>
              </p>
              <p className="ticket__info">Время начала сеанса:
                <span className="ticket__details ticket__start"> {data.start_time}</span>
              </p>
              <PreLoader load={img.load} />
              {
                img.img && 
                <div className="ticket__info-qr" dangerouslySetInnerHTML={{ __html: img.img }} />
              }
              <p className="ticket__info">
              {
                timeOverdue() < Date.now() ?
                <span className="buying__info-custom custom-warning">Билет не действителен. Время сеанса прошло.</span> :
                <span className="buying__info-custom custom-info">Билет действителен до: {timeOverdue().toLocaleString()}</span>
              }
              </p>
              <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
              <p className="ticket__hint">Приятного просмотра!</p>
            </>
          )}
        </div>
    </section>
  )
}

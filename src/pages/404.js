import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section className="ticket">
      <PageHeader>404 Ошибка</PageHeader>
      <div className="ticket__info-wrapper">
        <p className="ticket__info">К сожалению данной страницы не существует.</p>
        <button className="acceptin-button" onClick={() => navigate('/')}>Вернуться</button>
      </div>
    </section>
  )
}

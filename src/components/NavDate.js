import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function NavDate({dates, setDate}) {
  const visibleDays = 6;
  const [state, setState] = useState({ start: 0, end: (visibleDays - 1), current: 0 });

  const onStateSpace = (value, add = 0) => value >= (state.start + add) && value <= (state.end + add);
  const handleSetCurrent = idx => {
    setState(prev => ({ ...prev, current: idx}));
    setDate(dates[idx]);
  }
  const handleChangeDay = add =>
    ((add > 0 && state.end < (dates.length - 1)) || /* Next Day Button (add > 0) */
    (add < 0 && state.start > 0))                   /* Previous Day Button (add < 0) */
    && setState(prev => ({ 
      ...prev, 
      end: prev.end + add, 
      start: prev.start + add,
      current: onStateSpace(prev.current, add) ? 
        prev.current : 
        (add > 0 ? prev.start : prev.end) + add,
    }));

  return (
    <nav className="page-nav">
      {
        state.start !== 0 &&
        <Link className="page-nav__day page-nav__day_prev" onClick={() => handleChangeDay(-1)}></Link>
      }
      {
        dates.map((o, idx) => onStateSpace(idx) &&
        
        <Link className={"page-nav__day " + (idx === 0 ? "page-nav__day_today " : "") +
          (state.current === idx ? "page-nav__day_chosen " : "") }
          onClick={() => handleSetCurrent(idx)} key={`${o.day}${o.month}`}>
          <span className="page-nav__day-week">
            {o.dayweek}
          </span>
          <span className="page-nav__day-number">
            {o.day} {o.month}
          </span>
        </Link>
      )}
      {
        state.end !== (dates.length - 1) &&
        <Link className="page-nav__day page-nav__day_next" onClick={() => handleChangeDay(1)}></Link>
      }
    </nav>
  )
}

import React from 'react'
import PreLoader from '../../global/PreLoader'
import { observer } from 'mobx-react-lite'

const HallList = observer(({halls, name}) => {
  const {data, error} = halls.content || { data: [], error: null };
  const loadComplete = !halls.loading && !error && data;

  const handleChange = e => {
    const id = Number(e.target.dataset.id);

    if (halls.current && id === halls.current.id)
      return;

    halls.choosenHall(id);
  }

  return (
    <React.Fragment>
      <PreLoader load={halls.loading} error={error} />
      <ul className="conf-step__selectors-box" name="hall-options">
        { loadComplete && data.map(o =>
          <li key={o.id}>
            <input type="radio" className="conf-step__radio"
              name={"chairs-hall-"+name}
              onChange={handleChange}
              data-id={o.id} value={o.name}
              checked={o.id === halls.current.id}
            />
            <span className="conf-step__selector">{o.name}</span>
          </li>
        )}
      </ul>
    </React.Fragment>
  )
});

export default HallList;

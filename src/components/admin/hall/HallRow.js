import React from 'react'
import { observer } from 'mobx-react-lite'
import halls from '../../../control/store/halls'
import {
  DISABLED, STANDART, VIP,
} from '../../../control/constants';

const HallRow = observer(({rows, setState}) => {
  const types = [DISABLED, STANDART, VIP];
  const handleChangeType = e => {
    const data = e.target.dataset;
    let value = Number(data.type) + 1;
    if (value >= types.length) value = 0;
    setState(prev =>
      prev.map(r =>
        r.map(o =>
          o.index === Number(data.id) ? ({ ...o, value }) : o
    )));
  }
  return (
    <>
      { rows.map(o =>
        <span className={"conf-step__chair conf-step__chair_" + types[o.value]} key={o.index}
          data-type={o.value}
          data-id={o.index}
          onClick={handleChangeType}>
        </span>
      )}
    </>
  )
});

export default HallRow;

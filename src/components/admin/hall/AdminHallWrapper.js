import React from 'react'
import HallRow from './HallRow';
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react';
import { createTable } from '../../../control/functions';

const AdminHallWrapper = observer(({ current }) => {
  const create = () =>
    createTable(
      current.rows, current.seats_on_row, JSON.parse(current.seats_table)
  );

  const [state, setState] = useState(create());

  useEffect(() => {
    if (!current) return;

    setState(create());
  }, [current]);

  return (
    <div className="conf-step__hall">
      <div className="conf-step__hall-wrapper" id="hall-table">
        { state.map((o, idx) =>
          <div className="conf-step__row" key={"row"+idx}>
            <HallRow rows={o} setState={setState} />
          </div>
        )}
      </div>
    </div>
  )
});

export default AdminHallWrapper;

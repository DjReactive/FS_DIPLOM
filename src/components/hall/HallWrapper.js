import { useState } from 'react';
import { createTable } from '../../control/functions';
import HallRow from './HallRow';

export default function HallWrapper({hall, tickets, state, setState}) {
  const { rows, seats_on_row, seats_table } = hall || { rows: 0, places: 0, seats_table: "[]"};
  const create = () =>
    createTable(
      rows, seats_on_row, JSON.parse(seats_table)
  );

  return (
    <div className="buying-scheme__wrapper">
      { create().map((o, idx) =>
        <div className="buying-scheme__row" key={"row"+idx}>
          <HallRow 
            rows={o} 
            tickets={tickets} 
            state={state} 
            setState={setState} 
          />
        </div>
      )}
    </div>
  )
}

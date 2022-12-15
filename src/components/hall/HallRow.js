import { DISABLED, PLACE_CLASSES } from '../../control/constants';

export default function HallRow({rows, state, setState, tickets = []}) {
  const takenArr = [];

  tickets.forEach(o =>
    Object.values(o.seat_places)
     .forEach(p => takenArr.push(Number(p)))
  );

  const handleChangeType = e => {
    const type = e.target.dataset.type;
    const id = Number(e.target.dataset.id);
    const remove = (arr, id) => {
      arr.splice(arr.indexOf(id), 1);
      return [...arr];
    }
    if (PLACE_CLASSES[type] === DISABLED || takenArr.includes(id)) return;

    setState(prev =>
      prev.includes(id) ? remove(prev, id) : [...prev, id]
    );
  }

  return rows.map(o =>
      <span className={"buying-scheme__chair buying-scheme__chair_" + 
          (state.includes(o.index) ? 'selected' : takenArr.includes(o.index) ? 'taken' : PLACE_CLASSES[o.value])}
          alt={"Место #" + o.index}
          key={o.index}
          data-type={o.value}
          data-id={o.index}
          onClick={handleChangeType}>
      </span>
  );

}
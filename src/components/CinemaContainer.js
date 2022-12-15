import Film from './Film';

export default function CinemaContainer({movies}) {
  return (
    <>
      { movies.map(o => <Film info={o} key={o.name} />) }
    </>
  )
}

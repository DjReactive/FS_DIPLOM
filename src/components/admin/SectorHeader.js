export default function SectorHeader({children}) {
  return (
    <header className="conf-step__header conf-step__header_opened">
      <h2 className="conf-step__title">{children || "Error title"}</h2>
    </header>
  )
}

export default function HallLegend({hall}) {
  const { price, vip_price } = hall || { price: 0, vip_price: 0 };
  return (
    <div className="buying-scheme__legend">
      <div className="col">
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно 
          (<span className="buying-scheme__legend-value">{price}</span> руб)
        </p>
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP 
          (<span className="buying-scheme__legend-value">{vip_price}</span> руб)
        </p>
      </div>
      <div className="col">
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято
        </p>
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано
        </p>
      </div>
    </div>
  )
}

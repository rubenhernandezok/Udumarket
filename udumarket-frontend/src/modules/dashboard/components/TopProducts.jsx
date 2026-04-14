export default function TopProducts({ products }) {

  const formatQty = (qty) => {
    const num = Number(qty);
    if (Number.isNaN(num)) return qty;
    return num.toFixed(3).replace(/\.?0+$/, "");
  };

  const formatUnitLabel = (unitType) => {
    switch (unitType) {
      case "kg":
        return "kg";
      case "liter":
        return "l";
      case "unit":
      default:
        return "unid";
    }
  };

  return (

    <div className="card p-3 shadow-sm mt-4">

      <h5>🔥 Productos más vendidos</h5>

      <ul className="list-group list-group-flush">

        {products.map((p, index) => (

          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >
            {p.name}
            <span>{formatQty(p.qty)} {formatUnitLabel(p.unit_type)}</span>
          </li>

        ))}

      </ul>

    </div>

  )

}

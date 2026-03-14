export default function LowStockProducts({ products }) {

  if (!products || products.length === 0) {
    return null
  }

  return (

    <div className="card shadow-sm mt-4 p-3">

      <h5>⚠️ Stock bajo</h5>

      <ul className="list-group list-group-flush">

        {products.map((p, index) => (

          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >

            {p.name}

            <span className="text-danger">
              stock {p.stock}
            </span>

          </li>

        ))}

      </ul>

    </div>

  )

}
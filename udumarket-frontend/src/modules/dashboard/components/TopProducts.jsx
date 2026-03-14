export default function TopProducts({ products }) {

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
            <span>{p.qty}</span>
          </li>

        ))}

      </ul>

    </div>

  )

}
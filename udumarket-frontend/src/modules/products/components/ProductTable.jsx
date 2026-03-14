export default function ProductTable({ products, onDelete }) {

  if (products.length === 0) {
    return <p className="text-muted">No hay productos</p>
  }

  return (

    <table className="table">

      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th></th>
        </tr>
      </thead>

      <tbody>

        {products.map(p => (

          <tr key={p.id}>

            <td>{p.name}</td>
            <td>${p.price}</td>
            <td>{p.stock}</td>
            <td>{p.categories?.name}</td>

            <td>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(p.id)}
              >
                eliminar
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  )

}
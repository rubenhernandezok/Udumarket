export default function ProductTable({ products, onDelete, onEdit }) {

  const formatUnit = (unit) => {

    switch (unit) {
      case "unit":
        return "unidades"
      case "kg":
        return "kg"
      case "liter":
        return "litros"
      default:
        return unit
    }

  }

  return (

    <div className="card mt-4">

      <div className="card-body">

        <table className="table table-striped table-hover">

          <thead>

            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Unidad</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No hay productos
                </td>
              </tr>

            ) : (

              products.map((p) => {

                const lowStock = p.stock_min && p.stock <= p.stock_min

                return (

                  <tr key={p.id}>

                    <td>{p.barcode || "-"}</td>

                    <td>{p.name}</td>

                    <td>{p.categories?.name || "-"}</td>

                    <td>{formatUnit(p.unit_type)}</td>

                    <td>${Number(p.price).toFixed(2)}</td>

                    <td
                      style={{
                        color: lowStock ? "red" : "inherit",
                        fontWeight: lowStock ? "bold" : "normal"
                      }}
                    >
                      {p.stock} {formatUnit(p.unit_type)}
                    </td>

                    <td>

                      {lowStock ? (
                        <span className="badge bg-danger">
                          Stock bajo
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          OK
                        </span>
                      )}

                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => onEdit(p)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(p.id)}
                      >
                        Eliminar
                      </button>

                    </td>

                  </tr>

                )

              })

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}

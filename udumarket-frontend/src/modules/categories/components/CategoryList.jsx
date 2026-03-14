export default function CategoryList({ categories, onDelete }) {

  if (categories.length === 0) {
    return <p className="text-muted">No hay categorías</p>
  }

  return (

    <ul className="list-group">

      {categories.map(cat => (

        <li
          key={cat.id}
          className="list-group-item d-flex justify-content-between"
        >

          {cat.name}

          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(cat.id)}
          >
            eliminar
          </button>

        </li>

      ))}

    </ul>

  )

}
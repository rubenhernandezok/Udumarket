import { useEffect, useState } from "react"
import { getCategories } from "../../categories/services/categoryService"

export default function ProductForm({ onCreate }) {

  const [categories, setCategories] = useState([])

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    unit_type: "unit",
    barcode: "",
    stock_min: ""
  })

  useEffect(() => {

    const loadCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    loadCategories()

  }, [])

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    onCreate(form)

    setForm({
      name: "",
      price: "",
      stock: "",
      category_id: "",
      unit_type: "unit",
      barcode: "",
      stock_min: ""
    })

  }

  return (

    <form onSubmit={handleSubmit} className="mb-4">

      <div className="row g-2">

        <div className="col-md-3">
          <input
            name="name"
            className="form-control"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            name="price"
            type="number"
            className="form-control"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
  <select
    name="unit_type"
    className="form-select"
    value={form.unit_type}
    onChange={handleChange}
  >
    <option value="unit">Unidad</option>
    <option value="kg">Kg</option>
    <option value="liter">Litro</option>
  </select>
</div>

<div className="col-md-2">
  <input
    name="barcode"
    className="form-control"
    placeholder="Código barras"
    value={form.barcode}
    onChange={handleChange}
  />
</div>

<div className="col-md-1">
  <input
    name="stock_min"
    type="number"
    className="form-control"
    placeholder="Min"
    value={form.stock_min}
    onChange={handleChange}
  />
</div>

        <div className="col-md-2">
          <input
            name="stock"
            type="number"
            className="form-control"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">

          <select
            name="category_id"
            className="form-select"
            value={form.category_id}
            onChange={handleChange}
          >

            <option value="">Categoría</option>

            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>

        </div>

        <div className="col-md-2">
          <button className="btn btn-success w-100">
            Crear
          </button>
        </div>

      </div>

    </form>

  )

}
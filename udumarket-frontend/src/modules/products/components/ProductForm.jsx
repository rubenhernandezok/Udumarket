import { useEffect, useState } from "react"
import { getCategories } from "../../categories/services/categoryService"

export default function ProductForm({ onCreate, editingProduct }) {

  const [categories, setCategories] = useState([])

  const [form, setForm] = useState({
    barcode: "",
    name: "",
    category_id: "",
    unit_type: "unit",
    price: "",
    stock: "",
    stock_min: ""
  })

  useEffect(() => {

    const loadCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    loadCategories()

  }, [])

  useEffect(() => {

    if (editingProduct) {

      setForm({
        barcode: editingProduct.barcode || "",
        name: editingProduct.name || "",
        category_id: editingProduct.category_id || "",
        unit_type: editingProduct.unit_type || "unit",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        stock_min: editingProduct.stock_min || ""
      })

    }

  }, [editingProduct])

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

const handleSubmit = async (e) => {

  e.preventDefault()

  await onCreate(form)

}


  return (

    <form onSubmit={handleSubmit}>

      <div className="mb-3">
        <label className="form-label">Código de barras</label>
        <input
          name="barcode"
          className="form-control"
          value={form.barcode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">

        <label className="form-label">Categoría</label>

        <select
          name="category_id"
          className="form-select"
          value={form.category_id}
          onChange={handleChange}
        >

          <option value="">Seleccionar categoría</option>

          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}

        </select>

      </div>

      <div className="mb-3">

        <label className="form-label">Unidad de medida</label>

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

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          name="price"
          type="number"
          className="form-control"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          name="stock"
          type="number"
          className="form-control"
          value={form.stock}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Stock mínimo</label>
        <input
          name="stock_min"
          type="number"
          className="form-control"
          value={form.stock_min}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-success w-100">

  {editingProduct ? "Actualizar producto" : "Crear producto"}

</button>


    </form>

  )

}

import { useEffect, useState } from "react"

import Layout from "../../../components/layout/Layout"

import ProductForm from "../components/ProductForm"
import ProductTable from "../components/ProductTable"

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService"

import { getCategories } from "../../categories/services/categoryService"


export default function Products() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)


  const loadProducts = async () => {

    const data = await getProducts()

    setProducts(data || [])

  }

  const loadCategories = async () => {

    const data = await getCategories()

    setCategories(data || [])

  }

  useEffect(() => {

    loadProducts()
    loadCategories()

  }, [])


  const handleSave = async (product) => {

    if (editingProduct) {

      await updateProduct(editingProduct.id, product)

    } else {

      await createProduct(product)

    }

    await loadProducts()

    setEditingProduct(null)

    setShowForm(false)

  }


  const handleDelete = async (id) => {

    await deleteProduct(id)

    loadProducts()

  }


  const handleEdit = (product) => {

    setEditingProduct(product)
    setShowForm(true)

  }


  // FILTRO BUSCADOR + CATEGORIA

  const filteredProducts = products.filter((p) => {

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode?.includes(search)

    const matchesCategory =
      categoryFilter === "" ||
      String(p.category_id) === String(categoryFilter)

    return matchesSearch && matchesCategory

  })


  return (

    <Layout>

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h2>Productos</h2>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
          >
            + Agregar producto
          </button>

        </div>


        {/* BUSCADOR + FILTRO */}

        <div className="row mb-3">

          <div className="col-md-8">

            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >

              <option value="">Todas las categorías</option>

              {categories.map((cat) => (

                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>

              ))}

            </select>

          </div>

        </div>


        <ProductTable
          products={filteredProducts}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />


        {/* MODAL */}

        {showForm && (

          <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >

            <div className="modal-dialog">

              <div className="modal-content">

                <div className="modal-header">

                  <h5 className="modal-title">

                    {editingProduct
                      ? `Editar producto: ${editingProduct.name}`
                      : "Nuevo producto"}

                  </h5>

                  <button
                    className="btn-close"
                    onClick={() => setShowForm(false)}
                  ></button>

                </div>

                <div className="modal-body">

                  <ProductForm
                    onCreate={handleSave}
                    editingProduct={editingProduct}
                  />

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </Layout>

  )

}

import { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"
import ProductForm from "../components/ProductForm"
import ProductTable from "../components/ProductTable"
import "../../shared/uduPage.css"

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

  // 🔥 PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const loadProducts = async () => {
    try {
      const res = await getProducts()

      // 🔥 FIX CLAVE: asegurar array siempre
      setProducts(Array.isArray(res?.data) ? res.data : [])

    } catch (error) {
      console.error("Error cargando productos:", error)
      setProducts([])
    }
  }

  const loadCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error cargando categorías:", error)
      setCategories([])
    }
  }

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  // 🔥 RESET PAGINA cuando cambia filtro
  useEffect(() => {
    setCurrentPage(1)
  }, [search, categoryFilter])

  const handleSave = async (product) => {

    try {

      if (editingProduct) {
        await updateProduct(editingProduct.id, product)
      } else {
        await createProduct(product)
      }

      await loadProducts()

      setEditingProduct(null)
      setShowForm(false)
      setCurrentPage(1)

    } catch (error) {
      console.error("Error guardando producto:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      await loadProducts()
      setCurrentPage(1)
    } catch (error) {
      console.error("Error eliminando producto:", error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  // 🔎 FILTRO SEGURO
  const filteredProducts = (products || []).filter((p) => {

    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode?.includes(search)

    const isLowStock = p.stock_min && p.stock <= p.stock_min

    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "low-stock" ||
      String(p.category_id) === String(categoryFilter) ||
      String(p.categories?.id) === String(categoryFilter)

    const matchesLowStock =
      categoryFilter !== "low-stock" || isLowStock

    return matchesSearch && matchesCategory && matchesLowStock
  })

  // 🔥 PAGINACIÓN
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))

  const startIndex = (currentPage - 1) * itemsPerPage

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (

    <Layout>

      <div className="container mt-4 udu-page">

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
              <option value="low-stock" style={{ color: "var(--danger)" }}>
                Bajo stock
              </option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* TABLA */}
        <ProductTable
          products={paginatedProducts}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* 🔢 PAGINACIÓN (ALINEADA) */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3 flex-wrap">

          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            ← Anterior
          </button>

          <span className="fw-semibold">
            Página {currentPage} de {totalPages}
          </span>

          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Siguiente →
          </button>

        </div>

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

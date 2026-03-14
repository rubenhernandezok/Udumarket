import { useEffect, useState } from "react"

import Layout from "../../../components/layout/Layout"

import ProductForm from "../components/ProductForm"
import ProductTable from "../components/ProductTable"

import {
  getProducts,
  createProduct,
  deleteProduct
} from "../services/productService"

export default function Products() {

  const [products, setProducts] = useState([])

  const loadProducts = async () => {

    const data = await getProducts()

    setProducts(data)

  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleCreate = async (product) => {

    await createProduct(product)

    console.log("RESPUESTA BACKEND:", result)
    loadProducts()

  }

  const handleDelete = async (id) => {

    await deleteProduct(id)

    loadProducts()

  }

  return (

    <Layout>

      <div className="container mt-4">

        <h2>Productos</h2>

        <ProductForm onCreate={handleCreate} />

        <ProductTable
          products={products}
          onDelete={handleDelete}
        />

      </div>

    </Layout>

  )

}
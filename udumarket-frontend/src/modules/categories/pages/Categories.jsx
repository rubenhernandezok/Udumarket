import { useEffect, useState } from "react"

import Layout from "../../../components/layout/Layout"

import CategoryForm from "../components/CategoryForm"
import CategoryList from "../components/CategoryList"

import {
  getCategories,
  createCategory,
  deleteCategory
} from "../services/categoryService"

export default function Categories() {

  const [categories, setCategories] = useState([])

  const loadCategories = async () => {

    const data = await getCategories()

    setCategories(data)

  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleCreate = async (name) => {

    await createCategory(name)

    loadCategories()

  }

  const handleDelete = async (id) => {

    await deleteCategory(id)

    loadCategories()

  }

  return (

    <Layout>

      <div className="container mt-4">

        <h2>Categorías</h2>

        <CategoryForm onCreate={handleCreate} />

        <CategoryList
          categories={categories}
          onDelete={handleDelete}
        />

      </div>

    </Layout>

  )

}
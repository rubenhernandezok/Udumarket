import { useEffect, useState } from "react"

import Layout from "../../../components/layout/Layout"

import CategoryForm from "../components/CategoryForm"
import CategoryList from "../components/CategoryList"

import {
  getCategories,
  createCategory,
  deleteCategory
} from "../services/categoryService"

import usePagination from "../../../hooks/usePagination"
import Pagination from "../../../components/common/Pagination"
import "../../shared/uduPage.css"

export default function Categories() {

  const [categories, setCategories] = useState([])

  const loadCategories = async () => {
    const data = await getCategories()
    setCategories(data || [])
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleCreate = async (name) => {
    await createCategory(name)
    await loadCategories()
    resetPage()
  }

  const handleDelete = async (id) => {
    await deleteCategory(id)
    await loadCategories()
    resetPage()
  }

  // 🔥 PAGINACIÓN
  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    resetPage
  } = usePagination(categories, 12)

  return (

    <Layout>

      <div className="container mt-4 udu-page">

        <h2>Categorías</h2>

        <CategoryForm onCreate={handleCreate} />

        <CategoryList
          categories={paginatedData}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
        />

      </div>

    </Layout>

  )

}

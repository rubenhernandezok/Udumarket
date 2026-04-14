import { useState } from "react"

export default function usePagination(data = [], itemsPerPage = 12) {

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const resetPage = () => setCurrentPage(1)

  return {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    setCurrentPage,
    resetPage
  }

}
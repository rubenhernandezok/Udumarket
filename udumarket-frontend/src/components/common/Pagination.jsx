export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {

  return (
    <div className="d-flex justify-content-center mt-3">

      <button
        className="btn btn-outline-primary me-2"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        ← Anterior
      </button>

      <span className="align-self-center">
        Página {currentPage} de {totalPages || 1}
      </span>

      <button
        className="btn btn-outline-primary ms-2"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={onNext}
      >
        Siguiente →
      </button>

    </div>
  )
}
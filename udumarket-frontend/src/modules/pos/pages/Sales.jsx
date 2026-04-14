import { useEffect, useState, Fragment } from "react"
import Layout from "../../../components/layout/Layout"
import { getSales } from "../services/saleService"
import "../../shared/uduPage.css"

export default function Sales() {

  const [sales, setSales] = useState([])
  const [totalSales, setTotalSales] = useState(0)

  const [filter, setFilter] = useState("all")
  const [expanded, setExpanded] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    loadSales()
  }, [currentPage, filter, selectedDate])

  const loadSales = async () => {

    try {

      let filters = {}

      if (selectedDate) {
        filters.date = selectedDate
      } else if (filter !== "all") {
        filters.filter = filter
      }

      const res = await getSales(currentPage, itemsPerPage, filters)

      setSales(res.data || [])
      setTotalSales(res.total || 0)

    } catch (error) {
      console.error("Error cargando ventas:", error)
      setSales([])
      setTotalSales(0)
    }

  }

  const toLocalDate = (date) => {
    return new Date(date + "Z").toLocaleString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const formatPaymentMethod = (method) => {
    switch (method) {
      case "cash":
        return "Efectivo"
      case "transfer":
        return "Transferencia"
      default:
        return method
    }
  }

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  const totalPages = Math.max(1, Math.ceil(totalSales / itemsPerPage))

  return (

    <Layout>

      <div className="container mt-4 udu-page">

        <h2>Historial de ventas</h2>

        {/* CARDS */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card p-3">
              <h6>Total (página actual)</h6>
              <h4>
                ${sales.reduce((acc, s) => acc + Number(s.total), 0).toFixed(2)}
              </h4>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3">
              <h6>Total registros</h6>
              <h4>{totalSales}</h4>
            </div>
          </div>

        </div>

        {/* FILTROS */}
        <div className="row mb-3">

          <div className="col-md-6">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
                setSelectedDate("")
                setCurrentPage(1)
              }}
            >
              <option value="all">Todas</option>
              <option value="today">Hoy</option>
              <option value="month">Este mes</option>
            </select>
          </div>

          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                setFilter("all")
                setCurrentPage(1)
              }}
            />
          </div>

        </div>

        {/* TABLA */}
        <table className="table table-striped">

          <thead>
            <tr>
              <th>Fecha</th>
              <th>Total</th>
              <th>Pago</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {sales.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No hay ventas
                </td>
              </tr>
            ) : (

              sales.map((sale) => (

                <Fragment key={sale.id}>

                  <tr
                    onClick={() => toggleExpand(sale.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{toLocalDate(sale.created_at)}</td>
                    <td>${Number(sale.total).toFixed(2)}</td>
                    <td>
                      <span
                        className={`payment-method ${
                          sale.payment_method === "cash"
                            ? "payment-method--cash"
                            : sale.payment_method === "transfer"
                              ? "payment-method--transfer"
                              : ""
                        }`}
                      >
                        {formatPaymentMethod(sale.payment_method)}
                      </span>
                    </td>
                    <td>{expanded === sale.id ? "▲" : "▼"}</td>
                  </tr>

                  {expanded === sale.id && (
                    <tr>
                      <td colSpan="4">
                        <div className="p-2">
                          {sale.items?.map((item, i) => (
                            <div key={i}>
                              {item.product_name} ({item.barcode}) — {item.quantity} x ${item.price}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}

                </Fragment>

              ))

            )}

          </tbody>

        </table>

        {/* PAGINACIÓN */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-3">

            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              ← Anterior
            </button>

            <span>
              Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Siguiente →
            </button>

          </div>
        )}

      </div>

    </Layout>
  )
}

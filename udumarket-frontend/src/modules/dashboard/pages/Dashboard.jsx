import { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"

import StatsCards from "../components/StatsCards"
import TopProducts from "../components/TopProducts"
import LowStockProducts from "../components/LowStockProducts"
import SalesChart from "../components/SalesChart"
import DashboardSkeleton from "../components/DashboardSkeleton"
import "../../shared/uduPage.css"

import { getDashboardStats } from "../services/dashboardService"

export default function Dashboard() {

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadDashboard = async () => {

      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Error cargando dashboard", error)
      } finally {
        setLoading(false)
      }

    }

    loadDashboard()

  }, [])

  return (

    <Layout>

      <div className="container mt-4 udu-page">

        <h2 className="mb-4">Dashboard</h2>

        {loading ? (

          <DashboardSkeleton />

        ) : (

          <>
            {/* 🔝 KPIs */}
            {stats && <StatsCards stats={stats} />}

            {/* 📊 GRÁFICO */}
            <div className="card mt-4 p-3">
              <h5>Ventas últimos 7 días</h5>

              {stats?.sales?.length > 0 ? (
                <SalesChart sales={stats.sales} />
              ) : (
                <p>No hay datos de ventas</p>
              )}
            </div>

            {/* 🔥 LISTAS */}
            <div className="row mt-4">

              <div className="col-md-6">
                <TopProducts products={(stats.top_products || []).slice(0, 5)} />
              </div>

              <div className="col-md-6">
                <LowStockProducts products={(stats.low_stock || []).slice(0, 5)} />
              </div>

            </div>
          </>

        )}

      </div>

    </Layout>

  )

}

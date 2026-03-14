import { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"

import StatsCards from "../components/StatsCards"
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

  if (loading) {
    return <p>Cargando dashboard...</p>
  }

  return (

    <Layout>

      <div className="container mt-4">

        <h2 className="mb-4">Dashboard</h2>

        {stats && <StatsCards stats={stats} />}

      </div>

    </Layout>

  )

}
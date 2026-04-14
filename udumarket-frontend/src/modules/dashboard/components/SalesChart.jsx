import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
)

export default function SalesChart({ sales }) {

  // 📅 convertir fechas a días tipo "Lun", "Mar"
 const formatDay = (dateString) => {
  const [year, month, day] = dateString.split("-")

  const date = new Date(year, month - 1, day) // ✅ LOCAL (NO UTC)

  return date.toLocaleDateString("es-AR", {
    weekday: "short"
  })
}

  const labels = sales.map(s => formatDay(s.date))
  const dataValues = sales.map(s => s.total)

  const data = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: dataValues,

        // 🎨 ESTILO PRO
        borderColor: "#4f46e5", // violeta moderno
        backgroundColor: "rgba(79, 70, 229, 0.15)",

        borderWidth: 3,
        tension: 0.4, // curva suave

        fill: true, // 🔥 relleno

        pointRadius: 4,
        pointBackgroundColor: "#4f46e5"
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 clave para tamaño

    plugins: {
      legend: {
        display: false // más limpio
      }
    },

    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div style={{ height: "250px" }}>
      <Line data={data} options={options} />
    </div>
  )
}
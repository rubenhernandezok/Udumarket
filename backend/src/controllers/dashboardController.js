import { supabase } from "../config/supabaseClient.js"

export const getDashboard = async (req, res) => {

  try {

    const business_id = req.user.business_id

    // fecha de hoy (inicio del día)
    const today = new Date()
    today.setHours(0,0,0,0)
    const todayISO = today.toISOString()

    // inicio del mes
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const monthStartISO = monthStart.toISOString()

    // ventas del día
    const { data: todaySales, error: todayError } = await supabase
      .from("sales")
      .select("total")
      .eq("business_id", business_id)
      .gte("created_at", todayISO)

    if (todayError) throw todayError

    // ventas del mes
    const { data: monthSales, error: monthError } = await supabase
      .from("sales")
      .select("total")
      .eq("business_id", business_id)
      .gte("created_at", monthStartISO)

    if (monthError) throw monthError

    const today_total = (todaySales || []).reduce(
      (acc, sale) => acc + sale.total,
      0
    )

    const month_total = (monthSales || []).reduce(
      (acc, sale) => acc + sale.total,
      0
    )

    res.json({
      today_sales: today_total,
      month_sales: month_total,
      sales_count_today: (todaySales || []).length
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: "Error cargando dashboard"
    })

  }

}
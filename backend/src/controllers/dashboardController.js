import { supabase } from "../config/supabaseClient.js"

export const getDashboard = async (req, res) => {

  try {

    const business_id = req.user.business_id
    const timeZone = "America/Argentina/Buenos_Aires"

    // =============================
    // 📅 HOY (ARG)
    // =============================
    const now = new Date()

    const todayLocal = new Date(
      now.toLocaleString("en-US", { timeZone })
    )

    todayLocal.setHours(0, 0, 0, 0)

    const todayISO = todayLocal.toISOString()

    // =============================
    // 📅 INICIO DE MES
    // =============================
    const monthStart = new Date(
      todayLocal.getFullYear(),
      todayLocal.getMonth(),
      1
    )

    const monthStartISO = monthStart.toISOString()

    // =============================
    // 📅 ÚLTIMOS 7 DÍAS
    // =============================
    const last7Days = new Date(todayLocal)
    last7Days.setDate(todayLocal.getDate() - 6)

    const last7ISO = last7Days.toISOString()

    // =============================
    // 💰 VENTAS MES
    // =============================
    const { data: monthSales, error: monthError } = await supabase
      .from("sales")
      .select("total")
      .eq("business_id", business_id)
      .gte("created_at", monthStartISO)

    if (monthError) throw monthError

    const month_total = (monthSales || []).reduce(
      (acc, sale) => acc + Number(sale.total),
      0
    )

    // =============================
    // 📊 VENTAS ÚLTIMOS 7 DÍAS
    // =============================
    const { data: weekSales, error: weekError } = await supabase
      .from("sales")
      .select("total, created_at")
      .eq("business_id", business_id)
      .gte("created_at", last7ISO)
      .order("created_at", { ascending: true })

    if (weekError) throw weekError

    // 🔥 MAPA POR DÍA (ARG)
    const salesMap = {}
    const salesCountMap = {}

    ;(weekSales || []).forEach(sale => {

      const localDate = new Date(sale.created_at).toLocaleDateString("en-CA", {
        timeZone
      })

      if (!salesMap[localDate]) {
        salesMap[localDate] = 0
      }
      if (!salesCountMap[localDate]) {
        salesCountMap[localDate] = 0
      }

      salesMap[localDate] += Number(sale.total)
      salesCountMap[localDate] += 1

    })

    // 🔥 TOTAL HOY (USANDO EL MISMO MAPA)
    const todayKey = todayLocal.toLocaleDateString("en-CA", {
      timeZone
    })

    const today_total = salesMap[todayKey] || 0

    // 🔥 GENERAR LOS 7 DÍAS
    const salesLast7Days = []

    for (let i = 6; i >= 0; i--) {

      const d = new Date(todayLocal)
      d.setDate(todayLocal.getDate() - i)

      const key = d.toLocaleDateString("en-CA", {
        timeZone
      })

      salesLast7Days.push({
        date: key,
        total: salesMap[key] || 0
      })

    }

    // =============================
    // 🔥 TOP PRODUCTOS
    // =============================
    const { data: topProducts, error: topError } = await supabase
      .from("sale_items")
      .select(`
        quantity,
        products (
          name,
          business_id,
          unit_type
        )
      `)

    if (topError) throw topError

    const productMap = {}

    ;(topProducts || []).forEach(item => {

      if (item.products?.business_id !== business_id) return

      const name = item.products?.name || "Producto"
      const unitType = item.products?.unit_type || "unit"

      if (!productMap[name]) {
        productMap[name] = { qty: 0, unit_type: unitType }
      }

      productMap[name].qty += Number(item.quantity)

    })

    const sortedProducts = Object.entries(productMap)
      .map(([name, data]) => ({ name, qty: data.qty, unit_type: data.unit_type }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5)

    // =============================
    // ⚠️ STOCK BAJO
    // =============================
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("name, stock, stock_min")
      .eq("business_id", business_id)

    if (productsError) throw productsError

    const lowStock = (products || [])
      .filter(p => p.stock <= p.stock_min)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5)

    // =============================
    // 🚀 RESPONSE FINAL
    // =============================
    res.json({
      today_sales: today_total,
      month_sales: month_total,
      sales_count_today: salesCountMap[todayKey] || 0,
      top_products: sortedProducts,
      low_stock: lowStock,
      sales: salesLast7Days
    })

  } catch (error) {

    console.error("ERROR DASHBOARD:", error)

    res.status(500).json({
      error: "Error cargando dashboard"
    })

  }

}

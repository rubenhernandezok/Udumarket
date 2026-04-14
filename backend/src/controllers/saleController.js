import { supabase } from "../config/supabaseClient.js"

export const createSale = async (req, res) => {

    try {

        const { items, payment_method } = req.body
        const business_id = req.user.business_id

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No hay productos en la venta" })
        }

        // calcular total
        let total = 0

        items.forEach(item => {
            total += item.price * item.quantity
        })

        // 1️⃣ crear venta
        const { data: sale, error: saleError } = await supabase
            .from("sales")
            .insert([
                {
                    business_id,
                    total,
                    items_count: items.length,
                    payment_method
                }
            ])
            .select()
            .single()

        if (saleError) throw saleError

        const sale_id = sale.id

        // 2️⃣ crear items de venta
        const saleItems = items.map(item => ({
            sale_id,
            business_id,
            product_id: item.product_id,
            product_name: item.name, // nombre del producto en el momento de la venta
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity
        }))

        const { error: itemsError } = await supabase
            .from("sale_items")
            .insert(saleItems)

        if (itemsError) throw itemsError

        /*/ 3️⃣ descontar stock
        for (const item of items) {

            const { data: product, error: productError } = await supabase
                .from("products")
                .select("stock")
                .eq("id", item.product_id)
                .single()

            if (productError) throw productError

            const newStock = product.stock - item.quantity

            const { error: stockError } = await supabase
                .from("products")
                .update({ stock: newStock })
                .eq("id", item.product_id)

            if (stockError) throw stockError

        }*/
    
        res.json({
            message: "Venta registrada correctamente",
            sale_id: sale.id
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            error: "Error al registrar la venta"
        })

    }

}

export const getSales = async (req, res) => {

  try {

    const business_id = req.user.business_id

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { date, filter } = req.query

    let query = supabase
      .from("sales")
      .select("*", { count: "exact" })
      .eq("business_id", business_id)

    // 🔥 FILTROS

   if (date) {

  // 🔥 FIX timezone ARGENTINA
  const start = new Date(date + "T00:00:00-03:00")
  const end = new Date(date + "T23:59:59-03:00")

  query = query
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())
}

    if (filter === "today") {
      const start = new Date()
      start.setHours(0, 0, 0, 0)

      const end = new Date()
      end.setHours(23, 59, 59, 999)

      query = query
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString())
    }

    if (filter === "month") {
      const now = new Date()

      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

      query = query
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString())
    }

    // 🔥 EJECUCIÓN SEGURA (ANTI ERROR PGRST103)

    let sales = []
    let count = 0

    const response = await query
      .order("created_at", { ascending: false })
      .range(from, to)

    if (response.error) {

      if (response.error.code === "PGRST103") {
        sales = []
        count = 0
      } else {
        throw response.error
      }

    } else {
      sales = response.data || []
      count = response.count || 0
    }

    const saleIds = sales.map(s => s.id)

    // 🔥 ITEMS SEGURO
    let items = []

    if (saleIds.length > 0) {
      const { data: itemsData, error: itemsError } = await supabase
        .from("sale_items")
        .select("sale_id, quantity, price, subtotal, product_id")
        .in("sale_id", saleIds)

      if (itemsError) throw itemsError

      items = itemsData || []
    }

    // 🔥 PRODUCTOS
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, barcode")

    if (productsError) throw productsError

    const productMap = {}
    products.forEach(p => {
      productMap[p.id] = p
    })

    const salesWithItems = sales.map((sale) => {

      const saleItems = items
        .filter(i => i.sale_id === sale.id)
        .map(i => ({
          ...i,
          product_name: productMap[i.product_id]?.name || "Producto eliminado",
          barcode: productMap[i.product_id]?.barcode || "-"
        }))

      return {
        ...sale,
        items: saleItems
      }

    })

    res.json({
      data: salesWithItems,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    })

  } catch (error) {

    console.error("ERROR SALES:", error)

    res.status(500).json({
      error: "Error obteniendo ventas"
    })

  }

}
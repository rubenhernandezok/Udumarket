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
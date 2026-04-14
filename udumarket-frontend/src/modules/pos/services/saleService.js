export async function createSale(cart, paymentMethod) {

  const token = localStorage.getItem("token");

  const items = cart.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }));

  const res = await fetch("http://localhost:3000/api/sales", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify({
      items,
      payment_method: paymentMethod
    })

  });

  if (!res.ok) {
    throw new Error("Error registrando venta");
  }

  return res.json();
}

export const getSales = async (page = 1, limit = 12, filters = {}) => {

  const token = localStorage.getItem("token")

  const params = new URLSearchParams({
    page,
    limit,
    ...filters
  })

  const res = await fetch(`http://localhost:3000/api/sales?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error("Error obteniendo ventas")

  return res.json()
}

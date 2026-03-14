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
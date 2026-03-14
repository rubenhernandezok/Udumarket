/*
saleService

Se encarga de enviar la venta al backend
*/

export const createSale = async (cart, paymentMethod) => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:3000/api/sales",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        items: cart,
        payment_method: paymentMethod
      })
    }
  );

  return await response.json();

};
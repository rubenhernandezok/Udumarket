/*
PaymentPanel

Muestra total de la venta
y permite cobrar.
*/
import { createSale } from "../../pos/services/saleService";


export default function PaymentPanel({ cart, total, setCart }) {

const handlePayment = async (method) => {

  if (cart.length === 0) {
    alert("No hay productos en la venta")
    return
  }

  try {

    const response = await createSale(cart, method)

    if (response.sale_id) {

      alert("Venta registrada correctamente")

      setCart([])

    } else {

      alert(response.error || "Error al registrar venta")

    }

  } catch (error) {

    console.error(error)

    alert("Error de conexión")

  }



};

  return (

    <div className="card p-3">

      <h5>Total</h5>

      <h3>${total}</h3>

      <button
        className="btn btn-success w-100 mb-2"
        onClick={() => handlePayment("cash")}
      >
        Cobrar efectivo
      </button>

      <button
        className="btn btn-primary w-100"
        onClick={() => handlePayment("transfer")}
      >
        Transferencia
      </button>

    </div>

  );

}
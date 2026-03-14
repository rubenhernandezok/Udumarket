import { useState } from "react";
import { createSale } from "../services/saleService";


/*
PaymentPanel
- Efectivo: muestra inline el campo de monto recibido y cambio,
  y llama al backend con method "cash".
- Transferencia: llama directamente al backend con method "transfer".
No existe pantalla adicional.
*/

export default function PaymentPanel({ cart, total, setCart, clearCart }) {
  const [method, setMethod] = useState(null); // null | "cash" | "transfer"
  const [received, setReceived] = useState("");
  const [loading, setLoading] = useState(false);

  const change =
    received !== "" ? parseFloat(received) - total : null;

  const handleSelectMethod = (m) => {
    if (m === "transfer") {
      handlePayment("transfer");
      return;
    }
    setMethod("cash");
    setReceived("");
  };

  const handlePayment = async (m) => {
    if (cart.length === 0) {
      alert("No hay productos en la venta");
      return;
    }

    if (m === "cash") {
      const recv = parseFloat(received);
      if (isNaN(recv) || recv < total) {
        alert("El efectivo recibido es insuficiente");
        return;
      }
    }

    setLoading(true);
    try {
      const response = await createSale(cart, m);
      if (response.sale_id) {

  alert("Venta registrada correctamente");

  setCart([]);

  setMethod(null);

  setReceived("");

  if (clearCart) {
    clearCart();
  }

      } else {
        alert(response.error || "Error al registrar venta");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pos-payment">
      {/* ── Botones de método de pago ── */}
      <div className="pos-payment-footer">
        <button
          className={`pos-btn-pay pos-btn-cash${method === "cash" ? " active" : ""}`}
          onClick={() => handleSelectMethod("cash")}
          disabled={loading}
        >
          💵 Efectivo
        </button>
        <button
          className="pos-btn-pay pos-btn-transfer"
          onClick={() => handleSelectMethod("transfer")}
          disabled={loading}
        >
          🏦 Transferencia
        </button>
      </div>

      {/* ── Panel de efectivo inline (sin nueva pantalla) ── */}
      {method === "cash" && (
        <div className="pos-cash-panel">
          <div className="pos-cash-row">
            {/* Efectivo recibido */}
            <div className="pos-cash-field">
              <label className="pos-cash-label">Efectivo recibido</label>
              <div className="pos-cash-input-wrap">
                <span className="pos-cash-symbol">$</span>
                <input
                  type="number"
                  className="pos-cash-input"
                  placeholder="0.00"
                  value={received}
                  onChange={(e) => setReceived(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Cambio */}
            <div className="pos-cash-field">
              <label className="pos-cash-label">Cambio</label>
              <div className={`pos-change-display${change !== null && change < 0 ? " negative" : ""}`}>
                <span className="pos-cash-symbol">$</span>
                <span className="pos-change-value">
                  {change !== null
                    ? `${change < 0 ? "-" : ""}${Math.abs(change).toFixed(2)}`
                    : "——"}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pos-cash-field">
              <label className="pos-cash-label">Total</label>
              <div className="pos-total-badge">${total.toFixed(2)}</div>
            </div>

            {/* Aceptar */}
            <button
              className="pos-btn-accept"
              onClick={() => handlePayment("cash")}
              disabled={loading || change === null || change < 0}
            >
              {loading ? "..." : "✔ Aceptar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

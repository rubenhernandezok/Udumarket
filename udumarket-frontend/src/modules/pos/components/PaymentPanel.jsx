import { useEffect, useState } from "react";
import { createSale } from "../services/saleService";


/*
PaymentPanel
- Efectivo: muestra inline el campo de monto recibido y cambio,
  y llama al backend con method "cash".
- Transferencia: llama directamente al backend con method "transfer".
No existe pantalla adicional.
*/

export default function PaymentPanel({ cart, total, setCart, clearCart, products }) {
  const [method, setMethod] = useState(null); // null | "cash" | "transfer"
  const [received, setReceived] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const change =
    received !== "" ? parseFloat(received) - total : null;

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const getProductById = (id) => {
    return (products || []).find((product) => product.id === id);
  };

  const formatUnitLabel = (unitType) => {
    switch (unitType) {
      case "kg":
        return "kg";
      case "liter":
        return "l";
      default:
        return "unid";
    }
  };

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
      setErrorMessage("No hay productos en la venta");
      return;
    }

    const stockIssue = cart.find((item) => {
      const product = getProductById(item.product_id);
      const stock = Number(product?.stock);
      if (!Number.isFinite(stock)) return false;
      return Number(item.quantity) > stock;
    });

    if (stockIssue) {
      const product = getProductById(stockIssue.product_id);
      const stock = Number(product?.stock);
      const unitLabel = formatUnitLabel(product?.unit_type);
      setErrorMessage(
        `Stock insuficiente para ${product?.name || "el producto"}. Disponible: ${stock} ${unitLabel}`
      );
      return;
    }

    if (m === "cash") {
      const recv = parseFloat(received);
      if (isNaN(recv) || recv < total) {
        setErrorMessage("El efectivo recibido es insuficiente");
        return;
      }
    }

    setLoading(true);
    try {
      const response = await createSale(cart, m);
      if (response.sale_id) {

  setSuccessOpen(true);

  setCart([]);

  setMethod(null);

  setReceived("");

  if (clearCart) {
    clearCart();
  }

      } else {
        setErrorMessage(response.error || "Error al registrar venta");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pos-payment">
      {/* Toast de error */}
      {errorMessage && (
        <div className="pos-toast pos-toast-error" role="alert">
          <span>{errorMessage}</span>
          <button
            className="pos-toast-close"
            onClick={() => setErrorMessage("")}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      )}

      {/* Modal de éxito */}
      {successOpen && (
        <div className="pos-modal-backdrop">
          <div className="pos-modal" role="dialog" aria-modal="true">
            <h4>Venta registrada correctamente</h4>
            <p>La venta se guardó con éxito.</p>
            <button
              className="pos-btn-accept"
              onClick={() => setSuccessOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
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

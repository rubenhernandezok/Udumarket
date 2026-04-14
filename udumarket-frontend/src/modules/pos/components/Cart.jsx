import CartItem from "./CartItem";

/*
Cart
Lista de productos agregados a la venta actual.
Muestra solo el cabezal cuando está vacío y
crece dinámicamente con cada producto agregado.
*/

export default function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  commitQuantity,
  onRemove
}) {
  return (
    <div className="pos-cart-wrap">
      <table className="pos-cart-table">
        <thead>
          <tr className="pos-cart-thead">
            <th className="pos-th">Codigo</th>
            <th className="pos-th">Descripción</th>
            <th className="pos-th">Precio Unit.</th>
            <th className="pos-th">Cantidad</th>
            <th className="pos-th">Total</th>
            <th className="pos-th"></th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="6" className="pos-cart-empty">
                Agregue productos para comenzar
              </td>
            </tr>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.product_id}
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                updateQuantity={updateQuantity}
                commitQuantity={commitQuantity}
                onRemove={onRemove}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

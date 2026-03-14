export default function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  onRemove
}) {

  return (
    <tr className="pos-cart-row">

      <td className="pos-td pos-td-id">
        {item.barcode}
      </td>

      <td className="pos-td pos-td-name">
        {item.name}
      </td>

      <td className="pos-td pos-td-price">
        ${Number(item.price).toFixed(2)}
      </td>

      <td className="pos-td pos-td-qty">

        <div className="pos-qty-cell">

          <button
            className="pos-qty-btn"
            onClick={() => decreaseQuantity(item.product_id)}
          >
            −
          </button>

          <input
  type="number"
  step="0.01"
  min="0"
  value={item.quantity}
  className="pos-qty-input"
  onChange={(e) =>
    updateQuantity(
      item.product_id,
      e.target.value
    )
  }
/>


          <button
            className="pos-qty-btn"
            onClick={() => increaseQuantity(item.product_id)}
          >
            +
          </button>

        </div>

      </td>

      <td className="pos-td pos-td-subtotal">
        ${Number(item.subtotal).toFixed(2)}
      </td>

      <td className="pos-td pos-td-action">

        <button
          className="pos-btn-remove"
          onClick={() => onRemove(item.product_id)}
        >
          ✕
        </button>

      </td>

    </tr>
  );
}
export default function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  commitQuantity,
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
            step={item.unit_type === "kg" ? "0.001" : "1"}
            min="0"
            value={item.quantity_input ?? item.quantity}
            className="pos-qty-input"
            onChange={(e) =>
              updateQuantity(
                item.product_id,
                e.target.value
              )
            }
            onBlur={(e) =>
              commitQuantity(
                item.product_id,
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitQuantity(item.product_id, e.currentTarget.value);
                e.currentTarget.blur();
              }
            }}
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

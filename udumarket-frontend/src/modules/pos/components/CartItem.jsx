/*
CartItem

Representa un producto dentro del carrito.
*/

export default function CartItem({ item, increaseQuantity, decreaseQuantity }) {

  return (

    <div className="d-flex justify-content-between align-items-center border-bottom py-2">

      <div>

        <strong>{item.name}</strong>

        <br />

        <small>
          ${item.price} x {item.quantity}
        </small>

      </div>

      <div>

        <button
          className="btn btn-sm btn-secondary me-2"
          onClick={() => decreaseQuantity(item.product_id)}
        >
          -
        </button>

        <button
          className="btn btn-sm btn-secondary"
          onClick={() => increaseQuantity(item.product_id)}
        >
          +
        </button>

      </div>

      <div>

        <strong>${item.subtotal}</strong>

      </div>

    </div>

  );

}
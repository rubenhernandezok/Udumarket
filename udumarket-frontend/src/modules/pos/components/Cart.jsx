import CartItem from "../../../modules/pos/components/CartItem";

/*
Cart

Lista de productos agregados
a la venta actual.
*/

export default function Cart({ cart, increaseQuantity, decreaseQuantity }) {

  return (

    <div className="card p-3 mb-3">

      <h5>Venta actual</h5>

      {cart.length === 0 && (
        <p className="text-muted">No hay productos</p>
      )}

      {cart.map((item) => (

        <CartItem
          key={item.product_id}
          item={item}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />

      ))}

    </div>

  );

}
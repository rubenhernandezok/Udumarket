/*
ProductResults

Muestra los productos encontrados
y permite agregarlos al carrito.
*/

export default function ProductResults({ products, onSelectProduct }) {

  return (

    <div className="card p-3">

      <h5>Resultados</h5>

      {products.length === 0 && (
        <p className="text-muted">Sin resultados</p>
      )}

      <ul className="list-group">

        {products.map((product) => (

          <li
            key={product.id}
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
            onClick={() => onSelectProduct(product)}
          >

            <strong>{product.name}</strong>

            <br />

            <small>${product.price}</small>

          </li>

        ))}

      </ul>

    </div>

  );

}
/*
ProductResults
Despliega los resultados de búsqueda como dropdown.
*/

export default function ProductResults({ products, onSelectProduct }) {

  if (products.length === 0) return null;

  return (
    <div className="pos-results-dropdown">

      {products.map((product) => (

        <div
          key={product.id}
          className={`pos-result-item ${product.stock <= 0 ? "no-stock" : ""}`}
          onClick={() => {
            if (product.stock <= 0) return;

            onSelectProduct(product);
          }}
        >

          <div className="pos-result-name">
            {product.name}
          </div>

          <div className="pos-result-info">

            <span className="pos-result-price">
              ${Number(product.price).toFixed(2)}
            </span>

            <span className={`pos-stock ${product.stock <= 3 ? "low" : ""}`}>
              {product.stock <= 0
                ? "SIN STOCK"
                : `Stock: ${product.stock}`}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}

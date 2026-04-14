/*
ProductResults
Despliega los resultados de búsqueda como dropdown.
*/

export default function ProductResults({ products, cart, onSelectProduct }) {

  if (products.length === 0) return null;

  const formatStock = (product, value) => {
    if (product.unit_type === "kg") {
      const rounded = Math.round(value * 1000) / 1000;
      return String(rounded).replace(/\.?0+$/, "");
    }
    return Math.round(value);
  };

  const formatUnitLabel = (unitType) => {
    switch (unitType) {
      case "kg":
        return "kg";
      case "liter":
        return "l";
      case "unit":
      default:
        return "unid";
    }
  };

  return (
    <div className="pos-results-dropdown">

      {products.map((product) => (
        (() => {
          const quantityInCart = Array.isArray(cart)
            ? cart.reduce((acc, item) => {
                if (item.product_id !== product.id) return acc;
                return acc + (Number(item.quantity) || 0);
              }, 0)
            : 0;

          const available = Number(product.stock || 0) - quantityInCart;
          const isOut = available <= 0;

          return (

        <div
          key={product.id}
          className={`pos-result-item ${isOut ? "no-stock" : ""}`}
          onClick={() => {
            if (isOut) return;

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

            <span className={`pos-stock ${available <= 3 ? "low" : ""}`}>
              {isOut
                ? "SIN STOCK"
                : `Stock: ${formatStock(product, available)} ${formatUnitLabel(product.unit_type)}`}
            </span>

          </div>

        </div>
          );
        })()

      ))}

    </div>
  );
}

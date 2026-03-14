import { useState, useEffect } from "react";

import ProductSearch from "../components/ProductSearch";
import ProductResults from "../components/ProductResults";
import Cart from "../components/Cart";
import PaymentPanel from "../components/PaymentPanel";
import Layout from "../../../components/layout/Layout";

import { getProducts } from "../../products/services/productService";

import "../POS.css";

export default function POS() {

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // cargar productos
  useEffect(() => {
    
    const loadProducts = async () => {
      const data = await getProducts();
      setAllProducts(data || []);
    };
    loadProducts();
  }, []);

  useEffect(() => {

  if (!searchQuery) return;

  const product = allProducts.find(
    p => p.barcode === searchQuery
  );

  if (product) {
    addProductToCart(product);
  }

}, [searchQuery]);

  // buscar productos
  const searchProducts = (query) => {

  setSearchQuery(query);

  if (!query) {
    setProducts([]);
    return;
  }

  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.barcode?.includes(query)
  );

  setProducts(filtered.slice(0, 10));
};

  // agregar producto al carrito
 const addProductToCart = (product) => {

  setCart((prev) => {

    const existing = prev.find((item) => item.product_id === product.id);

    if (existing) {
      return prev.map((item) =>
        item.product_id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      );
    }

    return [
      ...prev,
      {
        product_id: product.id,
        barcode: product.barcode,
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price,
      },
    ];
  });

  setProducts([]);

  // 👇 limpia buscador
  setSearchQuery("");
};


  // aumentar cantidad
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  };

  // disminuir cantidad
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product_id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // editar cantidad manual
 const updateQuantity = (id, value) => {

  if (value === "") {

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === id
          ? { ...item, quantity: "" }
          : item
      )
    );

    return;
  }

  const num = parseFloat(value);

  if (isNaN(num) || num <= 0) return;

  setCart((prev) =>
    prev.map((item) =>
      item.product_id === id
        ? {
            ...item,
            quantity: num,
            subtotal: num * item.price,
          }
        : item
    )
  );
};


  // eliminar producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.product_id !== id));
  };

  // limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  const reloadProducts = async () => {

  const data = await getProducts();

  setAllProducts(data || []);
};


  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <Layout>

      <div className="pos-page">

        {/* IZQUIERDA */}
        <div className="pos-left">

          <div className="pos-section-title">
            <span className="pos-title-icon">🛒</span>
            Ventas
          </div>

          <div className="pos-search-block">

            <ProductSearch
  query={searchQuery}
  onSearch={searchProducts}
  onClearCart={clearCart}
/>


            <ProductResults
              products={products}
              onSelectProduct={addProductToCart}
            />

          </div>

        </div>

        {/* DERECHA */}
        <div className="pos-right">

          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            updateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />

          <PaymentPanel
  cart={cart}
  total={total}
  setCart={setCart}
  clearCart={() => {
    clearCart();
    reloadProducts();
  }}
/>


        </div>

      </div>

    </Layout>
  );
}

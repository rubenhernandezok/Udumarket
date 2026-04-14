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

  const roundQuantity = (num, unitType) => {
    if (unitType === "kg") {
      return Math.round(num * 1000) / 1000;
    }
    return Math.round(num);
  };

  const formatQuantityForInput = (num, unitType) => {
    if (num === "" || num === null || num === undefined) return "";
    if (unitType === "kg") {
      const rounded = Math.round(num * 1000) / 1000;
      return String(rounded).replace(/\.?0+$/, "");
    }
    return String(Math.round(num));
  };

  const parseQuantityForItem = (item, rawValue) => {
    if (rawValue === "") return "";

    const normalized = String(rawValue).replace(",", ".").trim();
    const num = parseFloat(normalized);

    if (isNaN(num) || num <= 0) return null;

    if (item.unit_type === "kg") {
      const hasDecimal = normalized.includes(".");
      if (!hasDecimal && num >= 10) {
        return roundQuantity(num / 1000, "kg");
      }
      return roundQuantity(num, "kg");
    }

    return roundQuantity(num, "unit");
  };

  // 🔥 cargar productos (FIX CLAVE)
  useEffect(() => {

    const loadProducts = async () => {
      try {
        const res = await getProducts();
        setAllProducts(res.data || []); // 🔥 FIX
      } catch (error) {
        console.error("Error cargando productos:", error);
        setAllProducts([]);
      }
    };

    loadProducts();

  }, []);

  // 🔥 ESCANEO POR CÓDIGO DE BARRAS (FIX SAFE)
  useEffect(() => {

    if (!searchQuery || !Array.isArray(allProducts)) return;

    const product = allProducts.find(
      (p) => p.barcode === searchQuery
    );

    if (product) {
      addProductToCart(product);
    }

  }, [searchQuery, allProducts]);

  // 🔍 buscar productos (FIX SAFE)
  const searchProducts = (query) => {

    setSearchQuery(query);

    if (!query || !Array.isArray(allProducts)) {
      setProducts([]);
      return;
    }

    const filtered = allProducts.filter((p) =>
      p.name?.toLowerCase().includes(query.toLowerCase()) ||
      p.barcode?.includes(query)
    );

    setProducts(filtered.slice(0, 10));
  };

  // 🛒 agregar producto al carrito
  const addProductToCart = (product) => {

    setCart((prev) => {

      const existing = prev.find((item) => item.product_id === product.id);

      const currentQty = existing ? Number(existing.quantity) || 0 : 0;
      const available = Number(product.stock || 0) - currentQty;
      if (available <= 0) return prev;

      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id
            ? (() => {
                const nextQty = roundQuantity((Number(item.quantity) || 0) + 1, item.unit_type);
                return {
              ...item,
              quantity: nextQty,
              quantity_input: formatQuantityForInput(nextQty, item.unit_type),
              subtotal: nextQty * item.price,
            };
          })()
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
          unit_type: product.unit_type || "unit",
          quantity: 1,
          quantity_input: "1",
          subtotal: product.price,
        },
      ];
    });

    setProducts([]);
    setSearchQuery(""); // 🔥 limpiar buscador
  };

  // ➕ aumentar cantidad
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === id ? (() => {
          const step = item.unit_type === "kg" ? 0.1 : 1;
          const nextQty = roundQuantity((Number(item.quantity) || 0) + step, item.unit_type);
          return {
            ...item,
            quantity: nextQty,
            quantity_input: formatQuantityForInput(nextQty, item.unit_type),
            subtotal: nextQty * item.price,
          };
        })() : item
      )
    );
  };

  // ➖ disminuir cantidad
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product_id === id ? (() => {
            const step = item.unit_type === "kg" ? 0.1 : 1;
            const nextQty = roundQuantity((Number(item.quantity) || 0) - step, item.unit_type);
            return {
              ...item,
              quantity: nextQty,
              quantity_input: formatQuantityForInput(nextQty, item.unit_type),
              subtotal: nextQty * item.price,
            };
          })() : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✏️ editar cantidad manual
  const updateQuantity = (id, value) => {

    if (value === "") {
      setCart((prev) =>
        prev.map((item) =>
          item.product_id === id
            ? { ...item, quantity_input: "" }
            : item
        )
      );
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === id
          ? { ...item, quantity_input: value }
          : item
      )
    );
  };

  const commitQuantity = (id, value) => {
    setCart((prev) => {
      const targetItem = prev.find((item) => item.product_id === id);
      if (!targetItem) return prev;

      if (value === "") {
        return prev.map((item) =>
          item.product_id === id
            ? { ...item, quantity_input: formatQuantityForInput(item.quantity, item.unit_type) }
            : item
        );
      }

      const parsed = parseQuantityForItem(targetItem, value);
      if (parsed === null || parsed === "") {
        return prev.map((item) =>
          item.product_id === id
            ? { ...item, quantity_input: formatQuantityForInput(item.quantity, item.unit_type) }
            : item
        );
      }

      return prev.map((item) =>
        item.product_id === id
          ? {
              ...item,
              quantity: parsed,
              quantity_input: formatQuantityForInput(parsed, item.unit_type),
              subtotal: parsed * item.price,
            }
          : item
      );
    });
  };

  // ❌ eliminar producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.product_id !== id));
  };

  // 🧹 limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  // 🔄 recargar productos (FIX CLAVE)
  const reloadProducts = async () => {
    try {
      const res = await getProducts();
      setAllProducts(res.data || []); // 🔥 FIX
    } catch (error) {
      console.error("Error recargando productos:", error);
    }
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
            cart={cart}
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
            commitQuantity={commitQuantity}
            onRemove={removeFromCart}
          />

          <div className="pos-cart-total">
            <span className="pos-cart-total-label">Total venta</span>
            <span className="pos-cart-total-value">${total.toFixed(2)}</span>
          </div>

          <PaymentPanel
            cart={cart}
            total={total}
            setCart={setCart}
            clearCart={() => {
              clearCart();
              reloadProducts(); // 🔥 importante
            }}
          />

        </div>

      </div>

    </Layout>
  );
}

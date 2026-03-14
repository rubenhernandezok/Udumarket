import { useState, useEffect } from "react";

import ProductSearch from "../components/ProductSearch";
import ProductResults from "../components/ProductResults";
import Cart from "../components/Cart";
import PaymentPanel from "../components/PaymentPanel";
import Layout from "../../../components/layout/Layout"

import { getProducts } from "../../products/services/productService";

export default function POS() {

  // todos los productos del negocio
  const [allProducts, setAllProducts] = useState([]);

  // resultados filtrados
  const [products, setProducts] = useState([]);

  // carrito
  const [cart, setCart] = useState([]);

  /*
    Cargar todos los productos al iniciar POS
  */

  useEffect(() => {

    const loadProducts = async () => {

      const data = await getProducts();

      setAllProducts(data);

    };

    loadProducts();

  }, []);

  /*
    Buscar productos en memoria
  */

  const searchProducts = (query) => {

    if (!query) {
      setProducts([]);
      return;
    }

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setProducts(filtered.slice(0, 10)); // limitar resultados

  };

  /*
    Agregar producto al carrito
  */

  const addProductToCart = (product) => {

    const existing = cart.find(
      item => item.product_id === product.id
    );

    if (existing) {

      const updatedCart = cart.map(item =>
        item.product_id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price
            }
          : item
      );

      setCart(updatedCart);

    } else {

      const newItem = {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price
      };

      setCart([...cart, newItem]);

    }

  };

  const increaseQuantity = (id) => {

    const updated = cart.map(item =>
      item.product_id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price
          }
        : item
    );

    setCart(updated);

  };

  const decreaseQuantity = (id) => {

    const updated = cart
      .map(item =>
        item.product_id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.price
            }
          : item
      )
      .filter(item => item.quantity > 0);

    setCart(updated);

  };

  const total = cart.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  return (

    <Layout>

      <div className="container mt-4">

        <div className="row">

          <div className="col-md-5">

            <ProductSearch onSearch={searchProducts} />

            <ProductResults
              products={products}
              onSelectProduct={addProductToCart}
            />

          </div>

          <div className="col-md-7">

            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />

            <PaymentPanel
              cart={cart}
              total={total}
              setCart={setCart}
            />

          </div>

        </div>

      </div>

    </Layout>

  );

}
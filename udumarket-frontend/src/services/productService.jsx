/*
productService.js

Este archivo centraliza todas las llamadas al backend
relacionadas con productos.

Ventaja:
Si cambia la API del backend, solo modificamos aquí.
*/

const API_URL = "http://localhost:3000/api/products";

/*
Buscar productos

Endpoint backend:
GET /api/products/search?query=texto
*/

export const searchProducts = async (query) => {

  try {

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/search?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      throw new Error("Error buscando productos");
    }

    const data = await res.json();

    return data;

  } catch (error) {

    console.error("productService searchProducts:", error);

    return [];

  }

};
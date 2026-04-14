const API = "http://localhost:3000/api/products"

const getToken = () => localStorage.getItem("token")

export const getProducts = async (page = 1, limit = 12) => {

  const res = await fetch(`${API}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!res.ok) throw new Error("Error obteniendo productos")

  return res.json()
}

export const createProduct = async (product) => {

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(product)
  })

  return await res.json()
}

export const updateProduct = async (id, product) => {

  const token = localStorage.getItem("token")

  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  })

  if (!res.ok) {
    throw new Error("Error actualizando producto")
  }

  return res.json()
}


export const deleteProduct = async (id) => {

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

}
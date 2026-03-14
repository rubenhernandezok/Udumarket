const API = "http://localhost:3000/api/products"

const getToken = () => localStorage.getItem("token")

export const getProducts = async () => {

  const res = await fetch(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  return await res.json()
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

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(product)
  })

  return await res.json()
}

export const deleteProduct = async (id) => {

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

}
const API = "http://localhost:3000/api/categories"

export const getCategories = async () => {

  const token = localStorage.getItem("token")

  const res = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await res.json()
}

export const createCategory = async (name) => {

  const token = localStorage.getItem("token")

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  })

  return await res.json()
}

export const deleteCategory = async (id) => {

  const token = localStorage.getItem("token")

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

}
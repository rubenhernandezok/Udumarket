const API_URL = "http://localhost:3000/api/dashboard"

export const getDashboardStats = async () => {

  const token = localStorage.getItem("token")

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {

  const error = await response.json()

  console.error("Error backend:", error)

  throw new Error("Error obteniendo dashboard")

}

  return response.json()

}
import { useState } from "react"

export default function CategoryForm({ onCreate }) {

  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) return

    onCreate(name)

    setName("")
  }

  return (

    <form onSubmit={handleSubmit} className="mb-3">

      <div className="input-group">

        <input
          type="text"
          className="form-control"
          placeholder="Nombre de categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary">
          Crear
        </button>

      </div>

    </form>

  )
}
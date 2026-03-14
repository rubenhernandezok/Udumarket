import { useState } from "react";

export default function ProductSearch({ onSearch }) {

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {

    const value = e.target.value;

    setQuery(value);

    onSearch(value); // ahora llama al POS

  };

  return (

    <input
      type="text"
      className="form-control"
      placeholder="Buscar producto..."
      value={query}
      onChange={handleSearch}
    />

  );

}
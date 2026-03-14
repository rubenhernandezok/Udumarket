import React from "react";

export default function ProductSearch({ query, onSearch, onClearCart }) {

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="pos-search-row">

      <div className="pos-search-wrap">
        <input
          type="text"
          className="pos-search-input"
          placeholder="Buscar producto o escanear código..."
          value={query}
          onChange={handleChange}
        />
      </div>

      <button
        className="pos-btn-clear"
        onClick={onClearCart}
      >
        Limpiar
      </button>

    </div>
  );
}

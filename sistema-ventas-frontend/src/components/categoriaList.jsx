import React, { useEffect, useState } from "react";
import { getCategorias } from "../services/categoriaService";

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias().then(data => setCategorias(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Categorías</h2>
      <ul>
        {categorias.map(c => (
          <li key={c.id} className="border p-2 mb-2 rounded bg-gray-50">
            {c.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCategorias;

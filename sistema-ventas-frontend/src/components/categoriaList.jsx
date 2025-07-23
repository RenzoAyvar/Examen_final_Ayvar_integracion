import React, { useEffect, useState } from "react";
import { getCategorias } from "../services/categoriaService";


const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias().then(data => setCategorias(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lista de Categorías</h2>
      <div className="grid gap-4">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="bg-white shadow-md rounded-lg p-4">
            <p><span className="font-bold">Nombre:</span> {categoria.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaCategorias;

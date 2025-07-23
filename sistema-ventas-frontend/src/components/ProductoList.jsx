import React, { useEffect, useState } from "react";
import { getProductos } from "../services/productoService";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(data => setProductos(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Productos</h2>
      <ul>
        {productos.map(p => (
          <li key={p.id} className="border p-2 mb-2 rounded bg-gray-50">
            <p><strong>Nombre:</strong> {p.nombre}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
            <p><strong>Categoría:</strong> {p.categoria?.nombre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;

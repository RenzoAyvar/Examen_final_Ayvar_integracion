import React, { useEffect, useState } from "react";
import { getProductos } from "../services/productoService";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(data => setProductos(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lista de Productos</h2>
      <div className="grid gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white shadow-md rounded-lg p-4">
            <p><span className="font-bold">Nombre:</span> {producto.nombre}</p>
            <p><span className="font-bold">Precio:</span> ${producto.precio}</p>
            <p><span className="font-bold">Stock:</span> {producto.stock}</p>
            <p><span className="font-bold">Categoría:</span> {producto.categoria?.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProductos;

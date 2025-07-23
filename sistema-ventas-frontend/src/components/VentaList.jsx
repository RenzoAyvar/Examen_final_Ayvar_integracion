import React, { useEffect, useState } from 'react';
import { getVentas } from '../services/ventaService';

const ListaVentas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    getVentas().then(data => {
      const lista = data?.$values || [];
      console.log("Ventas cargadas: ", lista);
      setVentas(lista);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lista de Ventas</h2>
      <div className="grid gap-4">
        {ventas.map((venta) => (
          <div key={venta.id} className="bg-white shadow-md rounded-lg p-4">
            <p><span className="font-bold">ID:</span> {venta.id}</p>
            <p><span className="font-bold">Fecha:</span> {new Date(venta.fecha).toLocaleString()}</p>
            <p><span className="font-bold">Cliente:</span> {venta.clienteNombre ?? 'Sin nombre'}</p>
            <p><span className="font-bold">Total:</span> ${venta.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaVentas;

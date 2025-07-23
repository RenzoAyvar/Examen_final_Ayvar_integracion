import React, { useEffect, useState } from "react";
import { getClientes } from "../services/clienteService";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes().then(data => {
      console.log("Clientes cargados:", data);
      setClientes(data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lista de Clientes</h2>
      <div className="grid gap-4">
        {clientes.length === 0 ? (
          <p>No hay clientes disponibles.</p>
        ) : (
          clientes.map((cliente) => (
            <div key={cliente.id} className="bg-white shadow-md rounded-lg p-4">
              <p><strong>Nombre:</strong> {cliente.nombres} {cliente.apellidos}</p>
              <p><strong>Correo:</strong> {cliente.correo}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaClientes;

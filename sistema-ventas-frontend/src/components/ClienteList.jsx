import React, { useEffect, useState } from "react";
import { getClientes } from "../services/clienteService";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes().then(data => setClientes(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lista de Clientes</h2>
      <div className="grid gap-4">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="bg-white shadow-md rounded-lg p-4">
            <p><span className="font-bold">Nombres:</span> {cliente.nombres}</p>
            <p><span className="font-bold">Apellidos:</span> {cliente.apellidos}</p>
            <p><span className="font-bold">Correo:</span> {cliente.correo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaClientes;

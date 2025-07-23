import React, { useState } from "react";
import { createCliente } from "../services/clienteService";

const ClienteForm = () => {
  const [nombres, setNombres] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createCliente({ nombres }).then(() => {
      alert("Cliente creado");
      setNombres("");
    });
  };

  return (
    <div className="container mt-3">
      <h2>Nuevo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombres</label>
          <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default ClienteForm;

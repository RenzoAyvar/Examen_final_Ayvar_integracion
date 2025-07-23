import React from "react";
import VentaList from "./components/VentaList";
import ClienteList from "./components/clienteList";
import ProductoList from "./components/ProductoList";
import CategoriaList from "./components/categoriaList";
import DetalleVentaList from "./components/detalleVentaList";

function App() {
  return (
    <div>
      <h1>¡Bienvenido al Sistema de Ventas!</h1>
      <VentaList />
      <ClienteList />
      <ProductoList />
      <CategoriaList />
      <DetalleVentaList />
    </div>
  );
}

export default App;

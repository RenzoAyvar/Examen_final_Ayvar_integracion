import React from 'react';
import ListaClientes from './components/ClienteList';
import ListaProductos from './components/ProductoList';
import ListaCategorias from './components/categoriaList';
import ListaVentas from './components/VentaList';
import ListaDetalleVentas from './components/detalleVentaList';

const App = () => {
  return (
    <div className="p-4 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-6">Sistema de Ventas</h1>
      <ListaClientes />
      <ListaCategorias />
      <ListaProductos />
      <ListaVentas />
      <ListaDetalleVentas />
    </div>
  );
};

export default App;

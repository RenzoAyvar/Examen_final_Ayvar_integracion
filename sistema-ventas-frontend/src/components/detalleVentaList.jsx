import React, { useEffect, useState } from "react";
import { getDetalleVentas } from "../services/detalleVentaService";

const ListaDetalleVentas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    getDetalleVentas().then((data) => {
      console.log("DetalleVentas desde servicio:", data);

      const ventas = (Array.isArray(data) ? data : data?.$values || []).map((venta) => {
        const detalles = Array.isArray(venta?.detalles) ? venta.detalles : venta?.detalles?.$values || [];

        return {
          ...venta,
          detalles,
        };
      });

      console.log("Ventas procesadas:", ventas);
      setVentas(ventas);
    });
  }, []);

  console.log("Renderizando ventas:", ventas);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Detalle de Ventas</h2>
      <p>Ventas cargadas: {ventas.length}</p>
      {ventas.map((venta) => (
        <div key={venta.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p><strong>ID:</strong> {venta.id}</p>
          <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}</p>
          <p><strong>Cliente:</strong> {venta.clienteNombre}</p>
          <p><strong>Total:</strong> ${venta.total}</p>
          <h3 className="font-semibold mt-2">Productos:</h3>
          <table className="table-auto w-full text-left mt-2">
            <thead>
              <tr>
                <th className="border px-2">Producto</th>
                <th className="border px-2">Cantidad</th>
                <th className="border px-2">Precio Unitario</th>
                <th className="border px-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {venta.detalles?.length > 0 ? (
                venta.detalles.map((detalle, idx) => (
                  <tr key={idx}>
                    <td className="border px-2">{detalle.productoNombre}</td>
                    <td className="border px-2">{detalle.cantidad}</td>
                    <td className="border px-2">${detalle.precioUnitario}</td>
                    <td className="border px-2">${detalle.subtotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-2 text-center text-gray-500">Sin productos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ListaDetalleVentas;

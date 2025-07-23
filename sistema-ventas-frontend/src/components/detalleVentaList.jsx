import React, { useEffect, useState } from "react";
import "./DetalleVentaList.css";

const DetalleVentaList = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://localhost:7130/api/DetalleVenta");
        const data = await res.json();
        setVentas(data);
      } catch (error) {
        console.error("Error al obtener los detalles de venta:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="venta-container" >
      <h2>Detalle de Ventas</h2>
      {ventas.map((venta) => (
        <div className="venta-card" key={venta.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}>
          <p><strong>ID:</strong> {venta.id}</p>
          <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}</p>
          <p><strong>Cliente:</strong> {venta.clienteNombre}</p>
          <p><strong>Total:</strong> ${venta.total}</p>

          <h4>Productos:</h4>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {venta.detalles.map((detalle, index) => (
                <tr key={index}>
                  <td>{detalle.productoNombre}</td>
                  <td>{detalle.cantidad}</td>
                  <td>${detalle.precioUnitario}</td>
                  <td>${detalle.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DetalleVentaList;

const API_URL = "https://localhost:7130/api/DetalleVenta";

export async function getDetalleVentas() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los detalles de venta");
  return await response.json();
}

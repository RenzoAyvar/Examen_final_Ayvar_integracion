const API_URL = "https://localhost:7130/api/Producto";

export async function getProductos() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los productos");
  return await response.json();
}

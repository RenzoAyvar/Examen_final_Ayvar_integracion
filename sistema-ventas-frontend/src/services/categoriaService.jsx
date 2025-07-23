const API_URL = "https://localhost:7130/api/Categoria";

export async function getCategorias() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener las categorías");
  return await response.json();
}

const API_URL = "https://localhost:7130/api/Cliente";

export async function getClientes() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los clientes");
  return await response.json();
}

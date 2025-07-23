import axios from "axios";

const API_URL = "https://localhost:7130/api/Cliente";

export const getClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.$values || [];
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
};

import axios from "axios";

const API_URL = "https://localhost:7130/api/Producto";

export const getProductos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.$values || [];
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

import axios from "axios";

const API_URL = "https://localhost:7130/api/Categoria";

export const getCategorias = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.$values || [];
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};

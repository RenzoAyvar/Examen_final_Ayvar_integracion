import axios from "axios";

const API_URL = "https://localhost:7130/api/Venta";

export const getVentas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    return { $values: [] };
  }
};

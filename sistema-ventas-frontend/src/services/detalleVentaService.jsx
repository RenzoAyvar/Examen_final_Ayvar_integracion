import axios from "axios";

const API_URL = "https://localhost:7130/api/DetalleVenta";

export const getDetalleVentas = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("DetalleVentas desde servicio:", response.data); 
    return response.data.$values || [];
  } catch (error) {
    console.error("Error al obtener detalle de ventas:", error);
    return [];
  }
};

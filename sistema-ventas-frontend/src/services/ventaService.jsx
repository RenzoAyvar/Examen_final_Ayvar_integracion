import axios from 'axios';

const API_URL = 'https://localhost:7130/api/venta';

export const getVentas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

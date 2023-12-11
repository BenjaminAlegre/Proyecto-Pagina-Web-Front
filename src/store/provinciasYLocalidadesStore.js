import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const ObtenerProvinciaApi = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/provincia/provinciasNombre`);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const ObtenerLocalidadApi = async (provincia) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/provincia/nombresLocalidades?nombreProvincia=${provincia}`);
    return await [...new Set(response.data.sort())];
  } catch (error) {
    console.log(error);
  }
};
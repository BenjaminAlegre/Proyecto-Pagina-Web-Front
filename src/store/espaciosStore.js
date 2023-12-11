import axios from "axios";

export const obtenerListaEspacios = () => {
  try {
    const response = axios.get(`http://localhost:8080/reserva/listarLugares`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

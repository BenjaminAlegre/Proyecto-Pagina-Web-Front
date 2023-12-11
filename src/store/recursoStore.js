import axios from "axios";

export const modificarRecurso = (id, recurso) => {
  try {
    const response = axios.put(
      `http://localhost:8080/recurso/actualizar/${id}`,
      recurso
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const crearRecurso = (recurso) => {
  try {
    const response = axios.post(`http://localhost:8080/recurso/crear`, recurso);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarRecurso = (id) => {
  try {
    const response = axios.delete(`http://localhost:8080/recurso/eliminar/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerRecurso = (id) => {
  try {
    const response = axios.get(`http://localhost:8080/recurso/obtener/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerListaRecursos = async () => {
  try {
    const response = axios.get(`http://localhost:8080/recurso/recursos`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

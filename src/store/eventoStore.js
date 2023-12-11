import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const getEventos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/evento/eventos");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addEvento = (evento) => {
  try {
    let eventoAEnviar = evento;

    const fechaHoraInicio = new Date(evento.horaInicio);
    const horaInicioFormateada = fechaHoraInicio.toISOString().substr(11, 12);
    const fechaHoraFin = new Date(evento.horaFin);
    const horaFinFormateada = fechaHoraFin.toISOString().substr(11, 12);

    eventoAEnviar = {
      ...eventoAEnviar,
      horaInicio: horaInicioFormateada,
      horaFin: horaFinFormateada,
    };

    if (eventoAEnviar.modalidad === "PRESENCIAL") {
      eventoAEnviar = {
        ...eventoAEnviar,
        plataforma: null,
        linkReunion: null,
      };
    }
    if (eventoAEnviar.modalidad === "VIRTUAL") {
      eventoAEnviar = {
        ...eventoAEnviar,
        lugar: null,
      };
    }

    const response = axios.post(
      "http://localhost:8080/evento/alta",
      eventoAEnviar
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editEvento = (evento) => {
  try {
    let eventoAEnviar = evento;

    const fechaHoraInicio = new Date(evento.horaInicio);
    let horas = fechaHoraInicio.getHours();
    let minutos = fechaHoraInicio.getMinutes();
    let segundos = fechaHoraInicio.getSeconds();
    let milisegundos = fechaHoraInicio.getMilliseconds();
    const horaInicioFormateada = `${String(horas).padStart(2, "0")}:${String(
      minutos
    ).padStart(2, "0")}:${String(segundos).padStart(2, "0")}.${String(
      milisegundos
    ).padStart(4, "0")}`;

    const fechaHoraFin = new Date(evento.horaFin);
    horas = fechaHoraFin.getHours();
    minutos = fechaHoraFin.getMinutes();
    segundos = fechaHoraFin.getSeconds();
    milisegundos = fechaHoraFin.getMilliseconds();
    const horaFinFormateada = `${String(horas).padStart(2, "0")}:${String(
      minutos
    ).padStart(2, "0")}:${String(segundos).padStart(2, "0")}.${String(
      milisegundos
    ).padStart(4, "0")}`;

    eventoAEnviar = {
      ...eventoAEnviar,
      horaInicio: horaInicioFormateada,
      horaFin: horaFinFormateada,
    };

    if (eventoAEnviar.modalidad === "PRESENCIAL") {
      eventoAEnviar = {
        ...eventoAEnviar,
        plataforma: null,
        linkReunion: null,
      };
    }
    if (eventoAEnviar.modalidad === "VIRTUAL") {
      eventoAEnviar = {
        ...eventoAEnviar,
        lugar: null,
      };
    }

    const response = axios.put(
      "http://localhost:8080/evento/editar/" + evento.id,
      eventoAEnviar
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/evento/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerEstadosEvento = async () => {
  const response = await axios.get(
    "http://localhost:8080/evento/estadosEvento"
  );
  return response.data;
};

export const obtenerModalidadesEvento = async () => {
  const response = await axios.get(
    "http://localhost:8080/evento/modalidadesEvento"
  );
  return response.data;
};
export const cancelarEvento = (id) => {
  try {
    const response = axios.put(`http://localhost:8080/evento/cancelar/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
export const activarEvento = (id) => {
  try {
    const response = axios.put(
      `http://localhost:8080/evento/modificarEstado/${id}?estado=Activo`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerEventoUUID = async (codigo) => {
  const response = await axios.get(
    `http://localhost:8080/evento/obtenerEventoPorCodigo/${codigo}`
  );
  // console.log(response.data);
  return response.data;
};

export const actualizarEstadoEvento = async (id, estado) => {
  const response = await axios.put(
    `http://localhost:8080/evento/modificarEstado/${id}?estado=${estado.descripcion}`
  );
  return response.data;
};
//dar baja fisica de los participantes a eventos
export const BajaParticipante = (id) => {
  const response = axios.delete(
    `http://localhost:8080/participante/borrar/${id}`
  );
  return response;
};

export const ObtenerPlataformaApi = async () => {
  const response = await axios.get(`http://localhost:8080/evento/plataformas`);
  return response.data;
};

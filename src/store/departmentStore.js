import { create } from "zustand";
import axios from "axios";

const watchDepartments = (get) => {
  // console.log("departments content:", get().departments);
};

export const departmentStore = create((set, get) => ({
  departments: [],
  departmentsNames: [],

  getDepartments: async () => {
    const response = await axios("http://localhost:8080/dpto/departamentos");
    const departments = await response.data;
    // console.log("----------DEPARTAMENTOS------")
    // console.log(departments)
    // console.log("-----------------------------")

    set((state) => ({
      departments,
    }));
    return response.data;
    //watchDepartments(get);
  },

  getDepartmentById: (id) => {
    return new Promise((resolve, reject) => {
      const department = get().departments.find(
        (department) => department.id === id
      );
      if (department) {
        resolve(department);
      } else {
        reject(`Departmento con ID ${id} no encontrado.`);
      }
    });
  },
  addDepartment: async (department) => {
    const newDptoSendBack = {
      nombre: department.name,
      objetivo: department.objective,
      estaActivo: department.estado === "activo",
    };

    const response = await axios.post(
      "http://localhost:8080/dpto/altaDepartamento",
      newDptoSendBack
    );

    await get().getDepartments(); //actualizar la lista de departamentos

    watchDepartments(get);

    return response;
  },
}));

export const getDepartmentsName = async () => {
  const response = await axios("http://localhost:8080/dpto/obtenerNombres");
  return response.data;
};
export const getDepartments = async () => {
  const response = await axios("http://localhost:8080/dpto/departamentos");
  return response.data;
};

export const fetchDeptoById = (id) => {
  return axios
    .get(`http://localhost:8080/dpto/departamento/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching department by ID:", error);
      return null;
    });
};

export const getPuestos = async () => {
  try {
    const response = await axios("http://localhost:8080/autoridad/Puestos");
    const puestos = await response.data;
    // const puestos = [
    //   "Presidente",
    //   "Vicepresidente",
    //   "Vicepresidente Pyme",
    //   "Vicepresidente de Financiamiento",
    //   "Secretario",
    //   "Jefe de Departamento",
    //   "Asistente de Departamento",
    //   "Asesor externo",
    // ];
    return puestos;
  } catch (error) {
    console.error("Error al obtener los puestos posibles:", error);
    throw error;
  }
};

export const getUsuarios = async () => {
  try {
    const response = await axios("http://localhost:8080/usuario/usuarios");
    const usuarios = await response.data;

    return usuarios;
  } catch (error) {
    console.error("Error al obtener los nombres de los usuarios:", error);
    throw error;
  }
};

export const cargarAutoridad = async (idDpto, autoridades) => {
  try {
    const respuesta = await axios.post(
      `http://localhost:8080/autoridad/agregarAutoridad/${idDpto}`,
      autoridades
    );
    console.log("Autoridad subida con éxito:", respuesta.data);
    return respuesta.data;
  } catch (error) {
    console.error("Error al subir la Autoridad:", error);
    throw error;
  }
};
export const updateDepartment = async (id, departmentData) => {
  try {
    console.log("Actualizando departamento con ID:", id);

    const { autoridades, ...restDepartmentData } = departmentData;

    // console.log("Datos del departamento a actualizar:", restDepartmentData);
    const responseDept = await axios.put(
      `http://localhost:8080/dpto/editarDepartamento/${id}`,
      restDepartmentData
    );

    if (autoridades && autoridades.length > 0) {
      //      console.log("Autoridades a actualizar:", autoridades);
      const responseAuth = await axios.put(
        `http://localhost:8080/autoridad/editarAutoridades/${id}`,
        autoridades
      );
      return {
        departamento: responseDept.data,
        autoridades: responseAuth.data,
      };
    }

    return { departamento: responseDept.data };
  } catch (error) {
    console.error("Error al actualizar:", error.response);
    throw error;
  }
};

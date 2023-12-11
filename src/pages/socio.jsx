import { useNavigate } from "react-router-dom";
import { sociosStore } from "../store/sociosStore";
import { departmentStore } from "../store/departmentStore";
import { typeSociosStore } from "../store/typeSociosStore";
import "../styles/socio.css";
import EditSocio from "../components/EditSocio";
import { setTitle } from "../utils/const";
import { useEffect, useState } from "react";
import { obtenerImagenSocio } from "../store/imagesStore";
import State from "../components/State";
import { buttonEditar, buttonEliminar } from "../styles/stylesComponent";

/**
 *
 * @param {{address: string, admin: boolean, category: number, cuit: number, dateCreation: Date, dateUnion: Date, department: [number], description: string, id: number, image: string, mail: string, name: string, password: string, phone: number, status: boolean}} socio
 */
const translatorSocio = (socio, departmentStore, typeSociosStore) => {
  const departments = departmentStore((state) => state.departments);
  const typeSocios = typeSociosStore((state) => state.typeSocios);
  const categorySocio = typeSocios.find((type) => type.id === socio.category);
  // const departmentsSocio = departments.filter((department) =>
  //   socio.department.includes(department.id)
  // );
  return {
    ...socio,
    // category: categorySocio,
    // department: departmentsSocio,
  };
};

const Socio = () => {

  setTitle("Perfil Socio");
  const navigate = useNavigate();

  const getSocioDetail = sociosStore((state) => state.getSocioDetail);

  const socioSelectDetail = translatorSocio(
    getSocioDetail(),
    departmentStore,
    typeSociosStore
  );
  const deleteSocioSelectect = sociosStore(
    (state) => state.deleteSocioSelectect
  );
  const cleanSocioSelectDetail = sociosStore(
    (state) => state.cleanSocioSelectDetail
  );
  const reactivarSocioSelectect = sociosStore(
    (state) => state.reactivarSocioSelectect
  );

  const [isEditing, setIsEditing] = useState(false);

  //imagen
  const [imagenSrc, setImagenSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await obtenerImagenSocio(socioSelectDetail?.id);
      setImagenSrc(imageUrl);
    };

    fetchImage();
  }, []);

  const handlerDeleteSocio = () => {
    if (socioSelectDetail?.estado === true) {
      deleteSocioSelectect(socioSelectDetail?.id);
    } else {
      reactivarSocioSelectect(socioSelectDetail);
    }
    cleanSocioSelectDetail();
    // return navigate("/socios");
    window.location.href = "/socios";
  };

  const handlerEditSocio = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <EditSocio
        socioSelectDetail={socioSelectDetail}
        setIsEditing={setIsEditing}
      />
    );
  }

  //console.log(socioSelectDetail);
  const estado = {
    id: socioSelectDetail.estado ? 1 : 4,
    descripcion: socioSelectDetail.estado ? "Activo" : "Inactivo",
  };

  return (
    // <div className="container-perfil">
    //   <section>
    //     <div className="info-perfil">
    //       <div className="container-img-perfil">
    //         <img src={imagenSrc} />
    //         <p className="categoriaInfo">{socioSelectDetail?.category?.name}</p>
    //       </div>

    //       <div className="bloque-info">
    //         <div>
    //           <p className="bold">NOMBRE</p>
    //           <p className="Info">{socioSelectDetail?.name}</p>
    //         </div>
    //         <div>
    //           <p className="bold">FECHA UNION</p>
    //           <p className="Info">{new Date(socioSelectDetail?.dateUnion).toDateString()}</p>
    //         </div>
    //       </div>

    //       <div className="bloque-info">
    //         <div>
    //           <p className="bold">EMAIL</p>
    //           <p className="Info">{socioSelectDetail?.mail}</p>
    //         </div>
    //         <div>
    //           <p className="bold">WEB</p>
    //           <p className="Info">{socioSelectDetail?.web}</p>
    //         </div>
    //       </div>

    //       <div className="bloque-info">
    //         <div>
    //           <p className="bold">CUIT</p>
    //           <p className="Info">{socioSelectDetail?.cuit}</p>
    //         </div>
    //         <div>
    //           <p className="bold">TELÉFONO</p>
    //           <p className="Info">{socioSelectDetail?.phone}</p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="container-departamentos">
    //       <strong>SUSCRIPCIONES</strong>
    //       <ul className="lista-departamentos">
    //         {socioSelectDetail?.etiquetas?.map((etiqueta) => (
    //           <li key={etiqueta.id} className="departamento">
    //             {etiqueta.nombre}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //     <div className="container_de_botones">
    //       <button onClick={handlerDeleteSocio}>ELIMINAR</button>
    //       <button onClick={handlerEditSocio}>EDITAR</button>
    //     </div>
    //   </section>
    // </div>
    <main className="body-allSocios">
      <section className="alinearAllSecciones">
        <section className="alinearImgTitulo">
          <img className="imgSocio" src={imagenSrc} />
          <h2 className="letraTitulo">{socioSelectDetail?.name}</h2>
        </section>
        <section className="alinearSectionSocio">
          <div className="alinearElement">
            <h3 className="letraTitulo">Estado:</h3>
            <State estado={estado} />
          </div>

          <div className="alinearElement">
            <h3 className="letraTitulo">Tipo de Socio:</h3>
            <p className="letraP">{socioSelectDetail?.category?.name}</p>
          </div>

          <div className="alinearElement">
            <h3 className="letraTitulo">Presidente:</h3>
            <p className="letraP">{socioSelectDetail?.presidente}</p>
          </div>

          <div className="alinearElement">
            <h3 className="letraTitulo">Cuit:</h3>
            <p className="letraP">{socioSelectDetail?.cuit}</p>
          </div>
        </section>
        {/* <section>
          <h2>Ubicación</h2>
          <div>
            <div>
              <p>Provincia:</p>
            </div>
            <div>
              <p>Localidad:</p>
            </div>
            <div>
              <p>Calle:</p>
            </div>
            <div>
              <p>Altura:</p>
            </div>
            <div>
              <p>Piso:</p>
            </div>
          </div>
        </section> */}
        <section>
          <h2 className="letraTitulo">Contacto:</h2>
          <div className="alinearContactoSocio">
            <div className="alinearElement">
              <h3 className="letraTitulo">Telefono:</h3>
              <p className="letraP">{socioSelectDetail?.phone}</p>
            </div>
            <div className="alinearElement">
              <h3 className="letraTitulo">Email:</h3>
              <p className="letraP">{socioSelectDetail?.mail}</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="letraTitulo">Etiquetas:</h2>
          <div>
            <ul className="alinearCategoria">
              {socioSelectDetail?.etiquetas?.map((etiqueta) => (
                <li key={etiqueta.id} className="etiquetaSocio">
                  {etiqueta.nombre}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <div className="container_de_botones">
            <button onClick={handlerEditSocio} style={buttonEditar}>EDITAR</button>
            <button onClick={handlerDeleteSocio} style={buttonEliminar}>{socioSelectDetail?.estado?'DESACTIVAR':'ACTIVAR'}</button>
          </div>
        </section>
      </section>
      <img
        src="../src/assets/img-fondo.svg"
        className="img-fondo"
        style={{ left: "-150px", top: "100px" }}
      ></img>
      <img
        src="../src/assets/img-fondo.svg"
        className="img-fondo"
        style={{ right: "-150px", top: "400px" }}
      ></img>
    </main>
  );
};

export default Socio;

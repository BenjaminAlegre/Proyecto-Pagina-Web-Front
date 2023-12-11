import React from "react";
import PropTypes from "prop-types";
import { sociosStore } from "../store/sociosStore";
import CardDepto from "../components/CardDepto";
import "../styles/allDeptos.css";

import { setTitle } from "../utils/const";
const AllDepto = (props) => {
  setTitle("Departamentos");
  const listDepartament = sociosStore.getState().listDepartament();
  return (
    <>
      <div className="body-allSocios">
        <main className="sectionPpalDptos">
          <section className="sectionTitle">
            <h1 className="titlefirst">Departamentos Técnicos</h1>
          </section>
          <section>
            <ul className="listDptos containerSocios">
              {listDepartament?.map((objeto, index) => (
                <>
                  {objeto.estaActivo && (
                    <li key={index}>
                      <CardDepto
                        id={objeto.id}
                        title={objeto.nombre}
                        description={objeto.objetivo}
                      />
                    </li>
                  )}
                </>
              ))}
            </ul>
          </section>
        </main>

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
      </div>
    </>
  );
};

AllDepto.propTypes = {};

export default AllDepto;

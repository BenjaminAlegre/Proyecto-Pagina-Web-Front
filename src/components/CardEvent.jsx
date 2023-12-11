import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/allEvent.css";
import {
  FiDisc,
  FiEdit,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiVideo,
} from "react-icons/fi";
import Modality from "./modality";
import State from "./State";
import { EventoFormat } from "../utils/const";
const iconEditar = {
  color: "#D9D9D9",
  width: "20px",
  height: "20px",
};
const iconElement = {
  color: "#D55453",
  width: "16px",
  height: "16px",
};

const CardEvent = ({
  id,
  title,
  fechaFin,
  fechaInicio,
  horaInicio,
  horaFin,
  estado,
  lugar,
  mod,
  departamento,
}) => {
  const fecha = EventoFormat(fechaFin, fechaInicio, horaInicio, horaFin);

  return (
    <>
      <Link to="/eventos/ver_evento" state={{ id: id }}>
        <div className="cardEvent">
          <section className="contElment">
            <h2 className="titleCard">{title}</h2>
            <p className="description">{departamento}</p>
            <div className="horaLugar">
              <div className="alingicon">
                <FiCalendar style={iconElement} />
                <p>
                  {fecha.fecha_inicio} al {fecha.fecha_Fin}
                </p>
              </div>
              <div className="alingicon">
                <FiClock style={iconElement} />
                <p>{fecha.fecha_hora_inicio}</p>
              </div>
              {lugar && (
                <div className="alingicon">
                  <FiMapPin style={iconElement} />
                  <p>{lugar}</p>
                </div>
              )}
              <div className="alingicon">
                <Modality estado={mod} />
                {/* <FiVideo style={iconElement} />
                <p>{mod}</p> */}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="estado">
                {/* <button className="buttonEditar">
                <FiEdit style={iconEditar} />
              </button> */}
                <div>
                  <State estado={estado} />
                  {/* <FiDisc />
                <p>Estado</p> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Link>
    </>
  );
};

CardEvent.propTypes = {};

export default CardEvent;

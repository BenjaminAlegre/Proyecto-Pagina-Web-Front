import React, { useEffect, useState } from "react";
import usePageSociosStore from "../../store/pageSociosStore";
import { sociosStore } from "../../store/sociosStore";
import { AutoComplete } from "antd";
import { estilosBarraBusqueda } from "../../styles/stylesComponent";
import { FiSearch } from "react-icons/fi";

const BarraBusquedaSocio =({filtro})=> {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { socios } = usePageSociosStore();

  useEffect(() => {
    console.log("socios", socios);
  }, [socios]);

  const setSocioSelectDetail = sociosStore(
    (state) => state.setSocioSelectDetail
  );

  const handleSearch = (value) => {
    const filteredSocios = socios.filter((socio) =>
      socio.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredSocios);
    //setSearchResults(filteredSocios);
    filtro(filteredSocios);

  };

  
  return (
    <AutoComplete
      style={estilosBarraBusqueda}
      onSearch={handleSearch}
      bordered={false}
      placeholder="Buscar..."
      suffixIcon={<FiSearch style={{ width: 20, height: 20 }} />}
    />
  );
}

export default BarraBusquedaSocio;

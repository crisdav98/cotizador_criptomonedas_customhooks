import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from './components/Cotizacion';
import Spinner from "./components/Spinner";
import axios from "axios";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [cotizacion, guardarCotizacion] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    // consultar la api para obtener la cotizacion
    const consultarApi = async () => {
      // se evita la ejecución por primera vez
      if (moneda === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      // Mostrar Spinner de Cargando
      guardarCargando(true);
      setTimeout(()=>{
        guardarCargando(false);
        guardarCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000);
    };
    consultarApi();
  }, [moneda, criptomoneda]);

  //Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner/> : <Cotizacion cotizacion = {cotizacion}/> 

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
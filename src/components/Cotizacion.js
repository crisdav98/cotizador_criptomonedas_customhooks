import React from "react";
import styled from "@emotion/styled";

const Contenedor = styled.div`
    color: white;
    padding-top: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    
`;
const Precio = styled.p`
    font-size: 30px;

    span{
        font-weight:bold;
    }
`;
const Info = styled.p`
    font-size: 18px;

    span{
        font-weight:bold;
    }
`;
const Cotizacion = ({ cotizacion }) => {
  // Si la cotización llega vacía no se ejecuta nada
  if (Object.keys(cotizacion).length === 0) return null;
  console.log(cotizacion);

  return (
    <Contenedor>
      <Precio> El precio es: <span>{cotizacion.PRICE}</span></Precio>
      <Info> Precio más alto del día: <span>{cotizacion.HIGHDAY}</span></Info>
      <Info> Precio más bajo del día: <span>{cotizacion.LOWDAY}</span></Info>
      <Info> Variación últimas 24 horas: <span>{cotizacion.CHANGEPCT24HOUR}</span></Info>
      <Info> Última actualización: <span>{cotizacion.LASTUPDATE}</span></Info>
    </Contenedor>
  );
};

export default Cotizacion;

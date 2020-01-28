import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import Axios from 'axios';

const Boton = styled.input`
    margin-top:20px;
    margin-bottom: 1rem;
    font-weight:bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
    //State del listado de criptomonedas
    const [listaCripto, guardarListaCripto] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre:'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre:'Peso Mexicano'},
        {codigo: 'EUR', nombre:'Euro'},
        {codigo: 'GBP', nombre:'Libra esterlina'}
    ];
    // Utilizar Cripomoneda
    const [criptomoneda ,SelectCripto] = useCriptomoneda('Elige tu criptomoneda','',listaCripto);
    // Utilizar useMoneda
    const [moneda,SelectMonedas] = useMoneda('Elige tu moneda','', MONEDAS);
    
    //Ejecutar llamado a la API
    useEffect(()=>{
        const consultarAPI = async()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);
            guardarListaCripto(resultado.data.Data);
        }
        consultarAPI();
    },[]);

    const cotizarMoneda = e =>{
        e.preventDefault();

        // validar si ambos campos están llenos
        if(moneda ==='' || criptomoneda===''){
            guardarError(true);
            return;
        }

        //  pasar los datos al componente principal
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
        // Pasar el error a false
        guardarError(false);
    }
    
    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='todos los campos son obligatorios'/> : null}
            <SelectMonedas />
            <SelectCripto/>
            <Boton 
                type="submit"
                value="Calcular" 
            />

        </form>
    ); 
};

export default Formulario;
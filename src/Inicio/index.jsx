import React from "react"
import '../components/css/Inicio.css'
import Drawer from "../components/Drawer/index.jsx"
import img from '../components/img/cocodrilo-inicio.png'
 import { Link } from "react-router-dom";





export const Inicio = () => {
    return (

        <div className="fondo">

            <Drawer />
            <div className="Inicio">
                <h1  >
                    REPTILES
                </h1>
                <h5>
                    Bienvenido a la pagina web en la que podras estar atento a
                    la humedad, movimineto y temperatura del reptil que desees.
                </h5>
                <Link to='/menu' style={{ textDecoration: 'none' }}>
                <button className="boton">

                    Empieza aquí

                </button>
                </Link>
            </div>

            <div>
                <div >
                    <img className="InicioImg" src={img} alt="" />
                </div>

                <div>
                    <div className="colorDiv"></div>

                </div>
            </div>

        </div>

    );
};
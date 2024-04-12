import React, { useState } from 'react';
import Drawer from '../Drawer/index'
import '../css/newHabitat.css'

function Formulario() {
  const [name, setName] = useState('')
  const [reptil, setReptil] = useState('');
  const [temperaturaAdecuadaMin, setTemperaturaAdecuadaMin] = useState('');
  const [temperaturaAdecuadaMax, setTemperaturaAdecuadaMax] = useState('');
  const [temperaturaNoAdecuadaMin, setTemperaturaNoAdecuadaMin] = useState('');
  const [temperaturaNoAdecuadaMax, setTemperaturaNoAdecuadaMax] = useState('');
  const [humedadAdecuadaMin, setHumedadAdecuadaMin] = useState('');
  const [humedadAdecuadaMax, setHumedadAdecuadaMax] = useState('');
  const [movimientoAdecuadoMin, setMovimientoAdecuadoMin] = useState('');
  const [movimientoAdecuadoMax, setMovimientoAdecuadoMax] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado!');
  };

  return (
    <div className='registro' d style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Drawer />


      <form onSubmit={handleSubmit} style={{width:'900px', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.20)'}} >
      <h2>Registro de habitat</h2>
        <div className='preguntas'>
          <label >
            Nombre del habitat
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className='cosito'
            />
          </label>
        </div>
        <div className='preguntas'>

          <label className='label'>
            ¿Qué reptil posee este hábitat?
            <input
              type="text"
              value={reptil}
              onChange={(event) => setReptil(event.target.value)}
              className='cosito'
            />
          </label>
        </div>
        <div className='preguntas'>
          <label >
            ¿Cuáles son las temperaturas adecuadas?
            <input
              type="range"
              min={0}
              max={100}
              value={temperaturaAdecuadaMin}
              onChange={(event) => setTemperaturaAdecuadaMin(event.target.value)}
              className='cosito'
            />
            <span >{temperaturaAdecuadaMin}</span>°C - {' '}
            <input
              type="range"
              min={0}
              max={100}
              value={temperaturaAdecuadaMax}
              onChange={(event) => setTemperaturaAdecuadaMax(event.target.value)}
              className='cosito'

            />
            <span>{temperaturaAdecuadaMax}</span>°C
          </label>
        </div>
        <div className='preguntas'>
          <label>
            ¿Cuáles son las temperaturas NO adecuadas?
            <input
              type="range"
              min={0}
              max={100}
              value={temperaturaNoAdecuadaMin}
              onChange={(event) => setTemperaturaNoAdecuadaMin(event.target.value)}
              className='cosito'
            />
            <span>{temperaturaNoAdecuadaMin}</span>°C - {' '}
            <input
              type="range"
              min={0}
              max={100}
              value={temperaturaNoAdecuadaMax}
              onChange={(event) => setTemperaturaNoAdecuadaMax(event.target.value)}
              className='cosito'
            />
            <span>{temperaturaNoAdecuadaMax}</span>°C
          </label>
        </div>
        <div className='preguntas'>
          <label>
            ¿Cuál es la humedad adecuada?
            <input
              type="range"
              min={0}
              max={100}
              value={humedadAdecuadaMin}
              onChange={(event) => setHumedadAdecuadaMin(event.target.value)}
              className='cosito'
            />
            <span>{humedadAdecuadaMin}</span>% - {' '}
            <input
              type="range"
              min={0}
              max={100}
              value={humedadAdecuadaMax}
              onChange={(event) => setHumedadAdecuadaMax(event.target.value)}
              className='cosito'
            />
            <span>{humedadAdecuadaMax}</span>%
          </label>
        </div>
        <div className='preguntas'>
          <label>
            ¿Cuál es el movimiento adecuado?
            <input
              type="range"
              min={0}
              max={100}
              value={movimientoAdecuadoMin}
              onChange={(event) => setMovimientoAdecuadoMin(event.target.value)}
              className='cosito'
            />
            <span>{movimientoAdecuadoMin}</span> - {' '}
            <input
              type="range"
              min={0}
              max={100}
              value={movimientoAdecuadoMax}
              onChange={(event) => setMovimientoAdecuadoMax(event.target.value)}
              className='cosito'
            />
            <span>{movimientoAdecuadoMax}</span>
          </label>
        </div>
        <button type="submit">Crear</button>
      
      </form>
    </div>
  );
}

export default Formulario;

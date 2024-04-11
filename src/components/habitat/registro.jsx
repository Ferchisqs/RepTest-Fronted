import React, { useState } from 'react';
import Drawer  from '../Drawer/index'

import '../css/newHabitat.css'

function Formulario() {
  const [reptil, setReptil] = useState('');
  const [temperaturaAdecuada, setTemperaturaAdecuada] = useState('');
  const [temperaturaNoAdecuada, setTemperaturaNoAdecuada] = useState('');
  const [humedadAdecuada, setHumedadAdecuada] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar el formulario o realizar otras acciones
    console.log('Formulario enviado!');
  };

  return (
    <div className='registro'd style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Drawer/>

      <form onSubmit={handleSubmit} >
        <div className='preguntas'>
          <label>
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
              type="text"
              value={temperaturaAdecuada}
              onChange={(event) => setTemperaturaAdecuada(event.target.value)}
              className='cosito'
            />
          </label>
        </div>
        <div  className='preguntas'>
          <label>
            ¿Cuáles son las temperaturas no adecuadas?
            <input
              type="text"
              value={temperaturaNoAdecuada}
              onChange={(event) => setTemperaturaNoAdecuada(event.target.value)}
              className='cosito'
            />
          </label>
        </div>
        <div  className='preguntas'>
          <label>
            ¿Cuál es la humedad adecuada?
            <input
              type="text"
              value={humedadAdecuada}
              onChange={(event) => setHumedadAdecuada(event.target.value)}
              className='cosito'
            />
          </label>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default Formulario;

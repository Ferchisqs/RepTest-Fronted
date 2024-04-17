import React, { useState } from 'react';
import Drawer from '../Drawer/index'
import '../css/newHabitat.css'

function Formulario() {
  const [name, setName] = useState('')
  const [temperaturaAdecuadaMin, setTemperaturaAdecuadaMin] = useState('');
  const [temperaturaAdecuadaMax, setTemperaturaAdecuadaMax] = useState('');
  const [humedadAdecuadaMin, setHumedadAdecuadaMin] = useState('');
  const [humedadAdecuadaMax, setHumedadAdecuadaMax] = useState('');
  const [horaNotificar, setHoraNotificar] = useState('');
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/habitat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_user: '', 
          name: name,
          interval_review:horaNotificar, 
          temperature: temperaturaAdecuadaMin, 
          humedity: humedadAdecuadaMin, 
          created_at: '', 
        }),
      });
      if (response.ok) {
        console.log('Hábitat creado exitosamente');
      } else {
        console.error('Error al crear hábitat:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
    }
    event.preventDefault();
    console.log('Formulario enviado!');
  };
  
   
  return (
    <div className='registro1' d style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Drawer />


      <form onSubmit={handleSubmit} style={{width:'900px', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.20)'}} >
      <h2 className='registrar1'>Registro de habitat</h2>
        <div className='preguntas'>
          <label >
            Nombre del habitat
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className='cosito1'
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
              className='cosito1'
            />
            <span >{temperaturaAdecuadaMin}</span>°C - {' '}
            <input
              type="range"
              min={0}
              max={100}
              value={temperaturaAdecuadaMax}
              onChange={(event) => setTemperaturaAdecuadaMax(event.target.value)}
              className='cosito1'

            />
            <span>{temperaturaAdecuadaMax}</span>°C
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
              className='cosito1'
            />
            <span>{humedadAdecuadaMin}</span>% - {' '}
            <input
              type="range"
              min={0}
              max={100}
              value={humedadAdecuadaMax}
              onChange={(event) => setHumedadAdecuadaMax(event.target.value)}
              className='cosito1'
            />
            <span>{humedadAdecuadaMax}</span>%
          </label>
        </div>

        <div className='preguntas'>
          <label>
            ¿Cada cuanto tiempo desea ser notificado? (en horas)
            <input
              type="number"
              min={1}
              max={24}
              value={horaNotificar}
              onChange={(event) => setHoraNotificar(event.target.value)}
              className='cosito1'
            />
          </label>
        </div>
       
        <button type="submit">Crear</button>
      
      </form>
    </div>
  );
}

export default Formulario;

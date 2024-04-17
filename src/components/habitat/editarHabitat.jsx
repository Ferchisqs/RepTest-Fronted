import React, { useEffect, useState } from 'react';
import Drawer from "../Drawer/index";
import { useParams } from 'react-router-dom';
import '../css/editarH.css'

function EditarHabitat() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [humedadDeseada, setHumedadDeseada] = useState('');
  const [temperaturaDeseada, setTemperaturaDeseada] = useState('');
  const [movimiento, setMovimiento] = useState('');
  const [idMonitoreo, setIdMonitoreo] = useState('');
  const [horaNotificar, setHoraNotificar] = useState('');

  useEffect(() => {
    async function fetchHabitat() {
      try {
        const response = await fetch(`http://localhost:4000/habitat/${id}`);
        if (!response.ok) {
          throw new Error('Error al recuperar los detalles del hábitat');
        }
        const habitatData = await response.json();
        const { name, humedity, temperature, movimiento, idMonitoreo, horaNotificar } = habitatData.data;
        setNombre(name);
        setHumedadDeseada(humedity);
        setTemperaturaDeseada(temperature);
        if (movimiento) setMovimiento(movimiento);
        if (idMonitoreo) setIdMonitoreo(idMonitoreo);
        if (horaNotificar) setHoraNotificar(horaNotificar);
      } catch (error) {
        console.error('Error fetching habitat details:', error);
      }
    }
    
    fetchHabitat();
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const habitatData = {};
      if (nombre !== '') habitatData.nombre = nombre;
      if (humedadDeseada !== '') habitatData.humedadDeseada = humedadDeseada;
      if (temperaturaDeseada !== '') habitatData.temperaturaDeseada = temperaturaDeseada;
      if (movimiento !== '') habitatData.movimiento = movimiento;
      if (idMonitoreo !== '') habitatData.idMonitoreo = idMonitoreo;
      if (horaNotificar !== '') habitatData.horaNotificar = horaNotificar;

      const response = await fetch(`http://localhost:4000/habitat/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitatData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el hábitat');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating habitat:', error);
    }
  };

  return (
    <div className='registro' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Drawer />
      <h2 className='editar'>Editar Hábitat</h2>
      <form onSubmit={handleSubmit} style={{ width:'600px', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.20)', justifyContent: 'center', alignItems: 'center' }}>
        <div className="preguntas">
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}  className='cosito' />
          </label>
        </div>
        <div className="preguntas">
          <label>
            Humedad Deseada:
            <input type="text" value={humedadDeseada} onChange={(e) => setHumedadDeseada(e.target.value)}  className='cosito' />
          </label>
        </div>
        <div className="preguntas">
          <label>
            Temperatura Deseada:
            <input type="text" value={temperaturaDeseada} onChange={(e) => setTemperaturaDeseada(e.target.value)}  className='cosito' />
          </label>
        </div>
        <div className="preguntas">
          <label>
            Movimiento:
            <input type="text" value={movimiento} onChange={(e) => setMovimiento(e.target.value)}  className='cosito' />
          </label>
        </div>
        <div className="preguntas">
          <label>
            ID Monitoreo:
            <input type="number" value={idMonitoreo} onChange={(e) => setIdMonitoreo(e.target.value)}  className='cosito' />
          </label>
        </div>
        <div className="preguntas">
          <label>
            Hora de Notificación:
            <input type="text" value={horaNotificar} onChange={(e) => setHoraNotificar(e.target.value)}  className='cosito' />
          </label>
        </div>
        <button className='guardar' type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarHabitat;

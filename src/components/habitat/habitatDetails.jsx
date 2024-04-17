import React, { useEffect, useState } from 'react';
import Drawer from "../Drawer/index";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppWidgetSummary from './app-widget-summary';
import AppNewsUpdate from './app-news-update';
import AppOrderTimeline from './app-order-timeline';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';
import imgHumedad from '../img/humedad.png'
import imgMovimiento from '../img/movimienot.png'
import imgTemperatura from '../img/termometro.png'
import Button from '@mui/material/Button'; 
import '../css/habitatD.css'

function HabitatDetails() {
  const [habitat, setHabitat] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchHabitatDetails() {
      try {
        const response = await fetch(`http://44.198.96.56:3004/habitat/${id}`);
        if (!response.ok) {
          throw new Error('Error al recuperar los detalles del hábitat');
        }
        const habitatData = await response.json();
        console.log(habitatData);
        setHabitat(habitatData.data);
      } catch (error) {
        console.error('Error fetching habitat details:', error);
      }
    }

    fetchHabitatDetails();
  });

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://44.198.96.56:3004/habitat/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el hábitat');
      }
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting habitat:', error);
    }
  };

  const handleEdit = () => {
    window.location.href = `/editar/${habitat.id}`;
  };

  if (!habitat) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Drawer />
      <h3>{habitat.name }</h3>
      <Container maxWidth="xl" className="container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Humedad" total={habitat.humedity} color="success" icon={<img alt="icon" className='img' src={imgHumedad} />} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Movimiento" total={habitat.movimiento} color="info" icon={<img alt="icon" className='img' src={imgMovimiento} />} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Temperatura" total={habitat.temperature} color="warning" icon={<img alt="icon" className='img' src={imgTemperatura} />} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
              title="REPORTES"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: [
                  'Primer Reporte',
                  'Segundo Reporte',
                  'Tercer Reporte',
                  'Cuarto Reporte',
                  'Quinto Reporte',
                ][index],
                time: faker.date.past(),
              }))}
            />
            {habitat.reportes && <AppOrderTimeline title="REPORTES" list={habitat.reportes} />}
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
               title="Nuevas actualizaciones"
               list={[...Array(5)].map((_, index) => ({
                 id: faker.string.uuid(),
                 title: faker.person.jobTitle(),
                 description: faker.commerce.productDescription(),
                 postedAt: faker.date.recent(),
               }))}>
            {habitat.actualizaciones && <AppNewsUpdate title="Nuevas actualizaciones"  />}
         </AppNewsUpdate>
          </Grid>
        </Grid>
      </Container>
      <Container className='hh'>
      <Button variant="contained" color="primary" onClick={handleEdit} sx={{marginLeft:'160px'}}  >Editar</Button>
      <Button variant="contained" color="error" onClick={handleDelete} sx={{marginLeft:'40px'}}>Eliminar</Button>
   </Container>
    </div>
  );
}

export default HabitatDetails;

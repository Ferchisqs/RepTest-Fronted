import React, { useEffect, useState } from 'react';
import Drawer from "../Drawer/index";
import '../css/habitat.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppWidgetSummary from './app-widget-summary';
import AppNewsUpdate from './app-news-update';
import AppOrderTimeline from './app-order-timeline';
import imgHumedad from '../img/humedad.png';
import imgMovimiento from '../img/movimienot.png';
import imgTemperatura from '../img/termometro.png';


function Index() {
  const [logs, setLogs] = useState([]);
  const [isFetch, setIsFetch]= useState(false)

 const formatLogs = (logs) => {
  return logs.map(log => ({
    id: log.id,
    noteTemperature: parseFloat(log.noteTemperature.replace('%', '')), 
    noteHumidity: parseFloat(log.noteHumidity.replace('%', '')), 
    movement: log.movement === 'No se ha detectado movimiento' ? 'No se ha detectado movimiento' : log.movement, 
    note: log.note,
    record_at: log.record_at
  }));
};

useEffect(() => {
  fetchLogs();
  setIsFetch(false)
  console.log('Reinicio IsFetch');
}, [isFetch]);

const fetchLogs = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzM3NDk2OH0.sKaUK1H8ZDe1HFv0uVGk9Pri3kyx6h_Z02tDwKxtFCo"
    }
    const req = {
      method: "GET",
      headers
    }
    const response = await fetch('http://34.239.65.110:3000/api/logs', req);
    const data = await response.json();
    console.log(data)
    const formattedLogs = formatLogs(data); 
    setLogs(formattedLogs);
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    if (error.response && error.response.data) {
      console.error('Error details:', error.response.data);
    }
  }
};

  

  return (
    <div>
      <Drawer setIsFetch={setIsFetch} />
      <h3>Habitat</h3>
      <Container maxWidth="xl" className="container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Humedad"
              total={logs.length > 0 ? logs[0].noteHumidity : "0"} 
              color="success"
              icon={<img alt="icon" className='img' src={imgHumedad} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Movimiento"
              total={logs.length > 0 ? logs[0].movement : "0"} 
              color="info"
              icon={<img alt="icon" className='img' src={imgMovimiento} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Temperatura"
              total={logs.length > 0 ? logs[0].noteTemperature : "0"} 
              color="warning"
              icon={<img alt="icon" className='img' src={imgTemperatura} />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="REPORTES"
              list={logs.map((log, index) => ({
                id: log.id,
                title: `Reporte ${index + 1}`,
                type: log.type,
                time: log.record_at,
              }))}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Nuevas actualizaciones"
              list={logs.map(log => ({
                id: log.id,
                title: log.note,
                description: log.note,
                image: '/assets/images/covers/cover_1.jpg',
                postedAt: log.record_at,
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Index;

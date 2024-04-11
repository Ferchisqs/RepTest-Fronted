import React from 'react'
import Drawer from "../Drawer/index"
import '../css/habitat.css'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from './app-widget-summary';
import AppNewsUpdate from './app-news-update';
import AppOrderTimeline from './app-order-timeline'
import { faker } from '@faker-js/faker';
import imgHumedad from '../img/humedad.png'
import imgMovimiento from '../img/movimienot.png'
import imgTemperatura from '../img/termometro.png'




function index() {
  return (
    <div>
      <Drawer />
      <h3>Habitat</h3>
      <Container maxWidth="x1" className="container">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Humedad"
              total={21}
              color="success"
              icon={<img alt="icon" className='img' src={imgHumedad} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Movimiento"
              total={1352831}
              color="info"
              icon={<img alt="icon" className='img' src={imgMovimiento} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Temperatura"
              total={9998}
              color="warning"
              icon={<img alt="icon" className='img' src={imgTemperatura} />}
            />
          </Grid>



          <Grid xs={12} md={6} lg={4}>
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
                type: `Reporte${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
          <Grid xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Nuevas actualizaciones"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: faker.person.jobTitle(),
                description: faker.commerce.productDescription(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>




          <Grid xs={12} md={6} lg={8}>


          </Grid>

          <Grid xs={12} md={6} lg={4}>

          </Grid>

          <Grid xs={12} md={6} lg={8}>

          </Grid>

          <Grid xs={12} md={6} lg={4}>

          </Grid>

          <Grid xs={12} md={6} lg={4}>

          </Grid>

          <Grid xs={12} md={6} lg={8}>

          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default index

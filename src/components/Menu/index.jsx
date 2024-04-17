import React, { useState, useEffect } from 'react';
import Drawer from '../Drawer/index';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'; 

import Iconify from '../iconify/index';
import PostCard from './post-card';
import PostSort from './post-sort';
import PostSearch from './post-search';

import img1 from '../img/cocodrilos-inicio.png'; 
import img2 from '../img/cocodrilos2pintado.png';
import img3 from '../img/cocodrilos3pintado.png';
import img4 from '../img/cocodrilos4.png';
import img5 from '../img/cocodrilos5epintado.png';
import img6 from '../img/cocodrilos6pintado.png';

import '../css/menu.css';

function Index() {
  const [habitats, setHabitats] = useState([]);
  const [, setImageIndex] = useState(0); 


  const [posts, setPosts] = useState([]); 

  const imageUrls = [
    img1, 
    img2,
    img3,
    img5,
    img4,
    img6,  ];

  useEffect(() => {
    fetch('http://localhost:4000/habitat')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setHabitats(data.data);
        setPosts(data.data); 
        updateImageIndex();
      })
      .catch(error => console.error('Error fetching habitats:', error));
  }, );

  const updateImageIndex = () => {
    setImageIndex(prevIndex => (prevIndex + 1) % 7); 
  };

  return (
    <div>
      <Drawer />
      <Container className='menu'>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography variant="h4" className='tituloMenu'>MENU</Typography>

          <Link to="/newHabitat" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="inherit" className='new' startIcon={<Iconify icon="eva:plus-fill" />} sx={{ background: '#F1B24A', borderColor: '#F1B24A', borderRadius: '999px', color: 'white' }}>
              Nuevo habitat
            </Button>
          </Link>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
          <PostSort
            options={[
              { value: 'latest', label: 'Latest' },
              { value: 'popular', label: 'Popular' },
              { value: 'oldest', label: 'Oldest' },
            ]}
          />
        </Stack>

        <Grid container spacing={3} className='menu3'>
          {habitats.map((habitat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={`/habitat/${habitat.id}`} style={{ textDecoration: 'none' }}>
                <PostCard habitat={habitat} imageUrl={imageUrls[index % 6]} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Index;

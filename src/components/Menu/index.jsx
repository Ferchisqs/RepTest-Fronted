import React from 'react'
import Drawer  from '../Drawer/index'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { posts } from '../../_mock/blog';

import Iconify from '../iconify/index';

import PostCard from './post-card';
import PostSort from './post-sort';
import PostSearch from './post-search';

import { Link } from 'react-router-dom';

import '../css/menu.css'

function index() {
  return (
    <div>
      <Drawer/>
     <Container className='menu'>
     
     <Stack direction="row"  justifyContent="space-between" mb={3} >
       <Typography variant="h4" className='titulo'>MENU </Typography >

       <Link to="/newHabitat" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="inherit" className='new' startIcon={<Iconify icon="eva:plus-fill" />}>
        Nuevo habitat
      </Button>
    </Link>
       
     </Stack>
 
     <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between" >
       <PostSearch posts={posts}   />
       <PostSort
         options={[
           { value: 'latest', label: 'Latest' },
           { value: 'popular', label: 'Popular' },
           { value: 'oldest', label: 'Oldest' },
         ]}
       />
     </Stack>

     <Grid container spacing={3} className= 'menu3'>
     {posts.map((post, index) => (
    <PostCard key={post.id} post={post} index={index} />
       ))} 
     </Grid>
   </Container>
    </div>
  )
}

export default index

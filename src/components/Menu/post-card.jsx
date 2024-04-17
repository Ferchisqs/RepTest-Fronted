import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fDate } from '../../utils/format-time';

export default function PostCard({ habitat, imageUrl }) {
  const { name, created_at } = habitat;

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
      }}
    >
      Created: {created_at ? fDate(created_at) : ''}
    </Typography>
  );

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ width: '300px', height: '240px', boxShadow: '0px 0px 2px' }}> 
        <Box p={2} style={{ height: '100%' }}>
          <Typography variant="h5" gutterBottom style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Nombre: {name}
          </Typography>
      
          {renderDate}
          <img src={imageUrl} alt={name} style={{ width: '120px', height: '120px', objectFit: 'cover', marginBottom: '8px' }} /> 
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  habitat: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { fDate } from '../../utils/format-time';



export default function PostCard({ habitat, index }) {
  const { nombre, createdAt } = habitat;

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            {nombre}
          </Typography>
          {renderDate}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  habitat: PropTypes.object.isRequired,
  index: PropTypes.number,
};

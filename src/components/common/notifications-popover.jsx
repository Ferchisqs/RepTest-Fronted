import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { fToNow } from '../../utils/format-time';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';

// ----------------------------------------------------------------------

const initialNotifications = [
  {
    id: 1,
    id_habitat: 1,
    noteTemperature: '15%',
    noteHumidity: '57%',
    movement: 'No se ha detectado movimiento',
    createdAt: new Date(),
    isUnRead: true,
  },
  {
    id: 2,
    id_habitat: 2,
    noteTemperature: '20%',
    noteHumidity: '60%',
    movement: 'Se ha detectado movimiento',
    createdAt: new Date(),
    isUnRead: true,
  },
];

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [totalUnRead, setTotalUnRead] = useState(0);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const socketConfig = {
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzMzOTQzNX0.3qgjk8mKh4ShqqspMC4rQgn2fZGdvyQnT5PC3eW6bJ0',
        }
      };
  
      const socket = io('http://44.223.186.80:5000/', socketConfig);
  
      socket.on('connect', () =>{
        console.log(socket.id)
      })
      socket.on("disconnect", () => {
        console.log(socket.id); 
      });
      socket.on('send_message', (payload) => {
        console.log("New notification received:", payload); // Verificar la llegada de las notificaciones
        setNotifications((prevNotifications) => [...prevNotifications, payload]);
        setTotalUnRead((prevTotalUnRead) => prevTotalUnRead + 1); // Incrementar el número total de notificaciones sin leer
      });
  
      return () => socket.disconnect();
    }
  }, []); 
  
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
    setTotalUnRead(0); // Marcar todas las notificaciones como leídas
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.number,
    id_habitat: PropTypes.number,
    noteTemperature: PropTypes.string,
    noteHumidity: PropTypes.string,
    movement: PropTypes.string,
    isUnRead: PropTypes.bool,
  }),
};

function NotificationItem({ notification }) {
  const { id, id_habitat, noteTemperature, noteHumidity, movement, createdAt, isUnRead } = notification;

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar>{id}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Habitat ID: ${id_habitat}`}
        secondary={
          <>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Temperature: {noteTemperature}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Humidity: {noteHumidity}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {movement}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fToNow(createdAt)}
            </Typography>
          </>
        }
      />
    </ListItemButton>
  );
}

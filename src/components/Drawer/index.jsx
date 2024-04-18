import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Searchbar from '../common/searchbar'
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import NotificationsPopover from '../common/notifications-popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon, faFolderMinus, faEnvelope, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import img from '../img/cocodrilos5c.png'
import { faWorm } from '@fortawesome/free-solid-svg-icons';




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const getLinkForIndex = (index) => {
  switch (index) {
    case 0:
      return '/habitat'; 
    case 1:
      return '/menu'; 
    case 2:
      return '/send-email'; 
    case 3:
      return '/drafts'; 
    default:
      return '/';
  }
};


export default function MiniDrawer({setIsFetch}) {

  const icons = [faWorm, faDragon, faFolderMinus, faEnvelope, faEdit];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open style={{ backgroundColor: '#fbfbf9', color: 'black',boxShadow:'none', px: 2.5, pb: 3, mt: 10  }} >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
          
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit" aria-label="search" sx={{ marginRight: 100 }}>
            <Searchbar />
          </IconButton>
          <IconButton color="inherit" aria-label="user" sx={{ marginRight: 5 }}>
            <NotificationsPopover setIsFetch={setIsFetch}/>
          </IconButton>
          <Link to="/registro" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton color="inherit" aria-label="user" sx={{ marginRight: 5 }}>
              <PersonSharpIcon />
            </IconButton>
          </Link>
        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open>
      
        <DrawerHeader>
          {/* Aquí no necesitamos un IconButton para cerrar el drawer */}
          <Link to="/">
              <img src={img} alt="" style={{ width: '125px', height: '50px' ,position:'relative',right:'60px'}} />
            </Link>
        </DrawerHeader>
        <Divider />
        
        <List>
  {['Habitat', 'Menu',  ].map((text, index) => (
    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={Link}
        to={getLinkForIndex(index)} 
        sx={{
          minHeight: 48,
          justifyContent: 'initial',
          px: 2.5,
          '&:hover': {
            bgcolor: '#FFDDA4' ,
            borderRadius:'20px'
            
          }
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: 'center',
            color: '#3c4122'
          }}
        >
          <FontAwesomeIcon icon={icons[index % icons.length]} sx={{ color: "#FFD43B" }} />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

      </Box>
    </Box>
  );
}
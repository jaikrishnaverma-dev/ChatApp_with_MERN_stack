import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function ChatHeader() {
  const navigate=useNavigate()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
        <nav className="navbar sticky-top navbar-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center mb-1">
        <div  className="d-flex align-items-center p-2  bg-purple rounded " style={{maxWidth:'70%'}}>
        <i onClick={()=>navigate('/chat')} className="bi bi-arrow-left-short me-3 fs-1"></i>
      <img
      onClick={toggleDrawer('right', true)}
        className="me-3"
        src="https://img.freepik.com/free-icon/user_318-159711.jpg"
        alt=""
        width="48"
        height="48"
      />
      <div onClick={toggleDrawer('right', true)} className="lh-1" style={{overflowX:'hidden'}}>
        <h1 className="h3 mb-0 lh-1" >Search</h1>
        {/* <small>Since 2011</small> */}
      </div>
    </div>
          <div className="max50 text-white fs-4">
          <i className="bi me-3 bi-telephone-fill"></i>
            <i className="bi bi-three-dots-vertical"></i>
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-between align-items-center ">
{/* limnk */}
        </div>
      </nav>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>

    </div>
  );
}
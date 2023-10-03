import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../App';
import { AdminRoleContext } from '../../../App';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const [isAuth, setIsAuth] = useContext(AuthContext)
  const [adminRole, setAdminRole] = useContext(AdminRoleContext)
  const history = useHistory()

  const handleLogOut = () => {
    setAdminRole(null)
    setIsAuth(null)
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    history.push('/login')
  }

  const categories = [
    {
      id: 'Инструменты',
      children: [
        { id: 'Публикации и коментарии',icon: <PeopleIcon />, link: '/adminPage/publication'},
        { id: 'Петиции', icon: <DnsRoundedIcon />, link: '/adminPage/patition' },
        { id: 'LogOut', icon: <DnsRoundedIcon />, onClick: handleLogOut},
      ],
    },
  ];

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Admin Panel
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, link, onClick }) => (
              <Link to={link}>
                <ListItem disablePadding key={childId}>
                  <ListItemButton selected={active} sx={item} onClick={onClick}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
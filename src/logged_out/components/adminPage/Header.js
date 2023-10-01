import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment >
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onDrawerToggle}
        edge="start"
        >
        <MenuIcon />
        </IconButton>
           
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
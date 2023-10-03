import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../../const/url';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './AdminPage.css'
import AddPetition from './AddPetition';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  export const StateContext = React.createContext()

export default function PatPage() {
    const [petitionData, setPetitionData] = useState([])
    const [value, setValue] = React.useState(0);
    const [state, setState] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
      axios.get(`${URL}/petition/allPetitions`)
      .then((response) => {
        setPetitionData(response.data);
        })
      .catch((error) => {
        console.log(error);
      });
    }, [state])

  return (
    <>
        <AppBar
            component="div"
            color="primary"
            position="static"
            elevation={0}
            sx={{ zIndex: 0 ,maxWidth: 936, margin: 'auto',}}
        >
            <Toolbar>
            <Grid container alignItems="center" spacing={1}>
                <Typography color="inherit" variant="h5" component="h1">
                    Петиции
                </Typography>
            </Grid>
            </Toolbar>
        </AppBar>
        
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>

        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Обработан" {...a11yProps(0)} />
                <Tab label="Набрано подписей" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div className='publication_elem'>
                    {petitionData.map((el) => (
                      <StateContext.Provider value={[state, setState]}>
                        <AddPetition el={el}/>
                      </StateContext.Provider>
                    ))}
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            {petitionData
            .filter(el => el.goal !== el.countSigned)
            .map((el) => (
                <div className='pub_coments' key={el.id}>
                    <Typography color="black" sx={{fontSize: '20px'}}>
                        {el.name}
                    </Typography>
                    <Typography color="text.secondary" >
                        {el.description}
                    </Typography>
                </div>
            ))}
            </CustomTabPanel>
        </Box>
        </Paper>
    </>
  );
}
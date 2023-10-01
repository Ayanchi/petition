import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../../const/url';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CommentsPub from './CommentsPub';
import { useHistory } from 'react-router-dom';
import './AdminPage.css'

export default function Content() {
    const [publicationData, setPublicationData] = useState([])
    const adminToken = localStorage.getItem('admin')
    const history = useHistory();

    useEffect(() => {
      axios.get(`${URL}/publication/allPublications`)
      .then((response) => {
        setPublicationData(response.data);
        })
      .catch((error) => {
        console.log(error);
      });
    }, [])

    const handlePubDelete = async(ID) => {
        try {
            await axios.post(`${URL}/publication/delete/${ID}`, {},
            {
                headers: {'Authorization': 'Bearer ' + adminToken}
            })
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                  console.log('Пользователь не авторизован');
                  localStorage.removeItem('admin')
                  localStorage.removeItem('token')
                  history.push('/admin')
                } else {
                  console.log('Ошибка сервера:', error.response.status, error.response.data);
                }
              } else {
                console.error('Ошибка запроса:', error.message);
              }
        }
    }

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
                    Публикации
                </Typography>
            </Grid>
            </Toolbar>
        </AppBar>
        
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <div className='publication_elem'>
                {publicationData.map((el) => (
                    <div className='pub_coments' key={el.id}>
                        <div className='publication_comp'>
                            <div className='publication_comp_text'>
                                <Typography color="text.secondary" >
                                    {el.name}
                                </Typography>
                                <Typography color="black" >
                                    {el.description}
                                </Typography>
                            </div>
                            <IconButton color="error" onClick={() => handlePubDelete(el.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                        <div>
                            <CommentsPub props={el.petitionId}/>
                        </div>
                    </div>
                ))}
                
            </div>
            
        </Paper>
    </>
  );
}
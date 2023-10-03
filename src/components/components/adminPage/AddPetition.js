import React, { useState } from "react"
import { Typography } from "@mui/material"
import { IconButton } from '@mui/material';
import {TextField} from "@mui/material"
import axios from "axios"
import { URL } from "../../../const/url"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import { AuthContext } from "../../../App";
import { useHistory } from 'react-router-dom';
import { StateContext } from "./PatPage";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function AddPetition({el}){
    console.log(el)

    const [isAuth] = useContext(AuthContext)
    const [state, setState] = useContext(StateContext)
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState(el.name)
    const [description, setDescription] = useState(el.description)
    const [goal, setGoal] = useState(el.goal)
    const [petSate, setPetState] = useState(true)

    const handlePubDelete = async(ID) => {
        try {
            await axios.delete(`${URL}/petition/delete/${ID}`,
            {
              headers: {'Authorization': 'Bearer ' + isAuth}
            },{})
            setState(!state)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                  console.log('Пользователь не авторизован');
                  localStorage.removeItem('role')
                  localStorage.removeItem('token')
                  history.push('/login');
                } else {
                  console.log('Ошибка сервера:', error.response.status, error.response.data);
                }
              } else {
                console.error('Ошибка запроса:', error.message);
              }
        }
    }
    const handlePudUpdate = async(ID) => {
        try {
            const res = await axios.put(`${URL}/petition/update/${ID}`,
            {
                name, 
                description,
                goal
            },
            {
                headers: {'Authorization': 'Bearer ' + isAuth}
            })
            // setState(!state)
            console.log(res)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                  console.log('Пользователь не авторизован');
                  localStorage.removeItem('role')
                  localStorage.removeItem('token')
                  history.push('/login');
                } else {
                  console.log('Ошибка сервера:', error.response.status, error.response.data);
                }
              } else {
                console.error('Ошибка запроса:', error.message);
              }
        }
    }

    return(
        <div className='pub_coments' key={el.id}>
            <div className='publication_comp'>
                <div className='publication_comp_text'>
                    <Typography color="black" sx={{fontSize: '20px'}}>
                        {el.name}
                    </Typography>
                    <Typography color="text.secondary" >
                        {el.description}
                    </Typography>
                </div>
                <IconButton color="error" onClick={() => handlePubDelete(el.id)}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton style={{ color: 'green' }} onClick={() => setOpen(true)}>
                    <AddIcon/>
                </IconButton>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={() => handlePudUpdate(el.id)} >
                            <TextField 
                                id="outlined-multiline-static"
                                sx={{width: '500px'}} 
                                rows={5}
                                multiline
                                label="Цель" 
                                variant="outlined" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <TextField id="outlined-multiline-static"
                                sx={{width: '500px', marginTop: '10px'}} 
                                rows={12}
                                multiline
                                label="Описание" 
                                variant="outlined" 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <TextField 
                                id="outlined-basic" 
                                sx={{width: '100px',marginTop: '10px'}} 
                                variant="outlined" 
                                type='number'
                                value={goal}
                                required
                                onChange={e => setGoal(e.target.value)}
                            />
                            <Box> <span>Статус</span> <Switch {...label} defaultChecked onClick={() => setPetState(!petSate)}/></Box>

                            <Button variant="contained" type="submit" endIcon={<SendIcon />} >
                                Отправить
                            </Button>

                        </form>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}
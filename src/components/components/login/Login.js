import { TextField, Button } from "@mui/material";
import React, {useState, useContext} from "react";
import './Login.css'
import { URL } from "../../../const/url";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Alert from '@mui/material/Alert';

import {AuthContext} from '../../../App'

export default function Login(){
    const [ isAuth, setIsAuth] = useContext(AuthContext)
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")
    const [notUser, setNotUser] = useState("")

    const navigate = useHistory()

    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${URL}/api/v1/auth/authenticate`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.setItem('token', JSON.stringify(response.data.access_token));
            localStorage.setItem('role', JSON.stringify(response.data.user.role))
            setIsAuth(response.data.access_token)
            navigate.push('/');
            console.log('login success')
        } catch (error) {
            if(error.response) {
                if(error.response.status === 403){
                    setNotUser(<Alert severity="error">Не верные данные</Alert>)
                }
            }
            
            console.error(error);
        }
    }
     
    return(
        <section className="main_reg">
             <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Аутентификация</h2>
                <div className="form_reg">
                    <TextField 
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="email"
                        autoComplete="email"
                        sx={{width: '300px', marginBottom: '20px'}}
                        fullWidth
                        value={email}
                    />
                    <TextField 
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        fullWidth
                        sx={{width: '300px', marginBottom: '20px'}}
                    />
                    {notUser}
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        type="submit"
                        sx={{marginTop:' 20px'}}>
                            войти
                    </Button>
                </div>
        </form>
        </section>
    )
}
import { TextField, Button } from "@mui/material";
import React, {useState} from "react";
import './Login.css'
import { URL } from "../../../const/url";
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

    const navigate = useHistory()

    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${URL}/api/v1/auth/authentication`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setToken(response.data);
            localStorage.setItem('token', JSON.stringify(response.data.access_token));
            navigate.push('/');
            console.log('login success')
        } catch (error) {
            console.error(error);
        }
    }

    console.log(token)
     
    return(
        <section className="main_reg">
             <form autoComplete="off" >
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
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        type="submit"
                        onClick={handleSubmit}
                        sx={{marginTop:' 20px'}}>
                            войти
                    </Button>
                </div>
        </form>
        </section>
    )
}
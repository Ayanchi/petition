import { TextField, Button } from "@mui/material";
import React, {useState} from "react";
import './Regist.css'
import { URL } from "../../../const/url";
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function Regist(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surename, setSurename] = useState("")
    const [token, setToken] = useState("")

    const navigate = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${URL}/api/v1/auth/register`, {
                firstname: name,
                lastname: surename,
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setToken(response.data);
            localStorage.setItem('token', JSON.stringify(response.data.access_token));
            navigate.push('/');
        } catch (error) {
            console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request data:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
        }
    }

    console.log(token)
     
    return(
        <section className="main_reg">
             <form autoComplete="off" >
                <h2>Регистрация</h2>
                <div className="form_reg">
                    <TextField 
                        label="Имя"
                        onChange={e => setName(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="name"
                        sx={{width: '300px', marginBottom: '20px'}}
                        fullWidth
                        value={name}
                    />
                    <TextField 
                        label="Фамилия"
                        onChange={e => setSurename(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="surename"
                        sx={{width: '300px', marginBottom: '20px'}}
                        fullWidth
                        value={surename}
                    />
                    <TextField 
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="email"
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
                        fullWidth
                        sx={{width: '300px', marginBottom: '20px'}}
                    />
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        type="submit"
                        onClick={handleSubmit}
                        sx={{marginTop:' 20px'}}>
                            зарегестрироваться
                    </Button>
                </div>
        </form>
        </section>
    )
}
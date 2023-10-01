import { TextField, Button } from "@mui/material";
import React, {useState} from "react";
import './AdminAuth.css'
import { URL } from "../../../const/url";
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function AdminAuth(){
    const [firstname, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState([])

    const navigate = useHistory()

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${URL}/api/v1/auth/register/admin`, {
                firstname,
                lastname,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setToken(response.data);
            localStorage.setItem('admin', JSON.stringify(response.data.access_token));
            navigate('/adminPage');
            console.log('login success')
        } catch (error) {
            console.error(error);
        }
    }

    console.log(token)
     
    return(
        <section className="main_reg">
             <form autoComplete="off" >
                <h2>Аутентификация Admin</h2>
                <div className="form_reg">
                    <TextField 
                        label="Name"
                        onChange={e => setName(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="name"
                        sx={{width: '300px', marginBottom: '20px'}}
                        fullWidth
                        value={firstname}
                    />
                    <TextField 
                        label="lastname"
                        onChange={e => setLastname(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="lastname"
                        sx={{width: '300px', marginBottom: '20px'}}
                        fullWidth
                        value={lastname}
                    />
                    <TextField 
                        label="email"
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
                            войти
                    </Button>
                </div>
        </form>
        </section>
    )
}
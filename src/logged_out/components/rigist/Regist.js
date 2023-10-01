import { TextField, Button } from "@mui/material";
import React, {useState} from "react";
import './Regist.css'
import { URL } from "../../../const/url";
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function Regist(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setName] = useState("")
    const [lastname, setSurename] = useState("")
    // const [token, setToken] = useState("")

    const navigate = useHistory()

    const handleSubmit = async() => {

        try {
          const response = await axios.post(`${URL}/api/v1/auth/register`, {

            firstname,
            lastname,
            email,
            password,
            
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('success');
          console.log(response);
          localStorage.setItem('token', JSON.stringify(response.data.access_token));
          navigate.push('/');
        } catch (error) {
          console.error(error);
        }
    };
     
    return(
        <section className="main_reg">
             <form >
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
                        value={firstname}
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
                        value={lastname}
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
                        autoComplete="username"
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
                        autoComplete="current-password"
                        sx={{width: '300px', marginBottom: '20px'}}
                    />
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        type="submit"
                        onClick={() => handleSubmit()}
                        sx={{marginTop:' 20px'}}>
                            зарегистрироваться
                    </Button>
                </div>
        </form>
        </section>
    )
}
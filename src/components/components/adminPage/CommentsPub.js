import React from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { URL } from "../../../const/url";
import { useEffect, useContext } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import './AdminPage.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../App";

export default function CommentsPub(props){
    const [boolComment, setBoolComment] = useState(false)
    const [stateComment, setStateComment] = useState(false)
    const [publicationData, setPublicationData] = useState([])
    const [isAuth] = useContext(AuthContext)
    const history = useHistory()

    useEffect( () => {
        axios.get(`${URL}/comments/getByPublicationId/${props.props}`)
        .then((response) => {
          setPublicationData(response.data);
          })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                  console.log('Пользователь не авторизован');
                  localStorage.removeItem('role')
                  localStorage.removeItem('token')
                  history.push('/login')
                } else {
                  console.log('Ошибка сервера:', error.response.status, error.response.data);
                }
              } else {
                console.error('Ошибка запроса:', error.message);
              }
        });
    }, [stateComment])

    const handlePubDelete = async(ID) => {
        try {
            await axios.delete(`${URL}/comments/delete/byId/${ID}`,
            {
                headers: {'Authorization': 'Bearer ' + isAuth}
            }, {})
            setStateComment(!stateComment)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                  console.log('Пользователь не авторизован');
                  localStorage.removeItem('role')
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

    return(
        <>
            {boolComment ? 
                <IconButton color="error" onClick={() => setBoolComment(false)}>
                    <KeyboardArrowDownIcon/>
                </IconButton>
                    : 
                
                <IconButton color="error" onClick={() => setBoolComment(true)}>
                    <KeyboardArrowUpIcon/>
                </IconButton>
            }
            <div className={boolComment ? 'comment_pub_open' : 'comment_pub_hide'}>
            {publicationData.map((el) => (
                <div id="comment_pub_text">
                    <Typography>
                        Автор: {el.senderEmail}
                    </Typography>
                    <Typography>
                        Коментарий: {el.comment}
                    </Typography>
                    {console.log(el)}
                    <IconButton color="error" onClick={() => handlePubDelete()}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            ))}
            </div>
            
        </>
    )
}
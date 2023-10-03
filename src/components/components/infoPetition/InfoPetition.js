import React, { useEffect, useState, useContext } from "react"
import './InfoPetition.css'
import image from '../../../assets/pettition.jpg'
import axios from "axios"
import { URL } from "../../../const/url"
import { useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../../App"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function InfoPetition(){
    const [petIdData, setPetIdData] = useState([])
    const {petId} = useParams();
    const [isAuth] = useContext(AuthContext)

    const [inn, setInn] = useState()
    const [petSate, setPetSate] = useState(false)

    const [opesn, setOpesn] = React.useState(false);
    const handleOpsen = () => setOpesn(true);
    const handleClosse = () => setOpesn(false);
    const [emptyComment, setEmptyComment] = useState('')
    const [subPetition, setSubPetition] = useState('')

    useEffect(() => {
        axios.get(`${URL}/petition/getById/${petId}`)
        .then((response) => {
            setPetIdData(response.data);
          })
        .catch((error) => {
            console.log(error);
        });
    },[petSate])

    console.log(petIdData)

    const handlePatition = () => {
        if(isAuth === null){
            return setEmptyComment(<Alert severity="error">войдите в систему</Alert>)
        }
        try {
            axios.post(`${URL}/petition/signToPetition/${petId}`,{},
               
                {
                    headers: {
                        'Authorization ' : `Bearer ` + isAuth,
                    },
                }
            )
            setPetSate(!petSate)
            if(petSate === true) {
                return setSubPetition(<Alert severity="success">вы подписали пертицию</Alert>)
            }
            if(petSate === false){
                return setSubPetition(<Alert severity="success">вы отписали пертицию</Alert>)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <section className="infoPet">
            <Button onClick={handleOpsen} className="inn">ИНН</Button>
            <Modal
                open={opesn}
                onClose={handleClosse}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
               <Box sx={style}>
                    
                    <TextField id="standard-basic" label="ИНН" variant="standard" value={inn} onChan={(e) => setInn(e.target.value)}/>
                    <Button>отправить</Button>

                </Box>
            </Modal>
            <div className="infoPet_info">
                <h1>{petIdData.name}</h1>
                <div className="ppp">
                    <div className="image_petition_info">
                        <img src={image} alt="" className="info_pet_image"/>
                        <div className="petition_button">
                            <div className="desition">
                                <p className="desition1p"> Подписи: {petIdData.countSigned}</p> <p>Цель: {petIdData.goal}</p>
                            </div>
                        
                            <Button onClick={() => handlePatition()} className="button">Подписать петицию</Button>
                        </div>
                        {subPetition}
                        {emptyComment}
                    </div>
                    
                    <div className="info_text">
                        <p> автор: {petIdData.author}</p>


                        <h2>Почему эта петиция важна</h2>
                        <div>
                            <span>
                            {petIdData.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
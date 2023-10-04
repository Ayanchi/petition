import React, { useEffect, useState } from "react"
import './Petition.css'
import image from '../../../assets/pettition.jpg'
import { Link } from "react-router-dom"; 
import axios from "axios";
import { URL } from "../../../const/url";

export default function Petitions(){

    const[dataPetition, setDataPetition] = useState([])

    useEffect(() => {
        axios.get(`${URL}/petition/allPetitions`)
        .then((response) => {
            setDataPetition(response.data);
            console.log(response.data)
          })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    return(
        <section className="petition_section">
            {dataPetition
            // .filter((el) => )
            .map((el, ind) => (
                <Link to={`petition/${el.id}`} className="hidden">
                    {console.log(el.id)}
                <div className="petition_box">
                    <img src={image} alt=""/>
                    <div className="petition_box_text">
                        <h1>{el.name}</h1>
                        <div>
                            <p>Собрано: {el.countSigned}</p> <p>Цель: {el.goal}</p>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
           
        </section>
    )
}
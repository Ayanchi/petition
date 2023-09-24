import React, { useEffect, useState } from "react"
import './Petition.css'
import image from '../../../assets/pettition.jpg'
import { Link } from "react-router-dom"; 
import axios from "axios";
import { URL } from "../../../const/url";

export default function Petitions(){

    const[dataPetition, setDataPetition] = useState([])
    const token = localStorage.getItem('token');
    console.log(token)

    useEffect(() => {
        try {
            axios.get(`${URL}/`)
        } catch (error) {
            console.log(error)
        }
    }, [])

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

    console.log(dataPetition)
    return(
        <section className="petition_section">
            {dataPetition.map((el, ind) => (
                <Link to={`petition/${el.id}`} className="hidden">
                <div className="petition_box">
                    <img src={image} alt=""/>
                    <div className="petition_box_text">
                        <h1>{el.name}</h1>
                        <div>
                            <p>Собрано: 20</p> <p>Цель:  100</p>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
           
        </section>
    )
}
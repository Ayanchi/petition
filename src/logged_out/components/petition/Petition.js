import React from "react"
import './Petition.css'
import image from '../../../assets/pettition.jpg'
import { Link } from "react-router-dom"; 

export default function Petitions(){
    return(
        <section className="petition_section">
            <Link to={`petition/${1}`} className="hidden">
                <div className="petition_box">
                    <img src={image} alt=""/>
                    <div className="petition_box_text">
                        <h1>Считать недействительным письмо в МОТ от Республики Беларусь, ввести экономические санкции</h1>
                        <div>
                            <p>Собрано: 20</p> <p>Цель:  100</p>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    )
}
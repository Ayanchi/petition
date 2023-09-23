import React from "react"
import './InfoPetition.css'
import image from '../../../assets/pettition.jpg'

export default function InfoPetition(){
    return(
        <section className="infoPet">
            <div className="infoPet_info">
                <h1>Требуем отозвать проект постановления о Парке креативных индустрий от 11 августа 2023 года</h1>
                <div className="ppp">
                    <div className="image_petition_info">
                        <img src={image} alt="" className="info_pet_image"/>
                        <div className="petition_button">
                            <div className="desition">
                                <p className="desition1p"> Подписи: 2000</p> <p>Цель: 4000</p>
                            </div>
                        
                            <button className="button">Подписать петицию</button>
                        </div>
                    </div>
                    
                    <div className="info_text">
                        <p>Создано: 22 aвгю 2022</p>


                        <h2>Почему эта петиция важна</h2>
                        <div>
                            <span>
                            Уважаемый Президент Садыр Нургожоевич Жапаров,
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
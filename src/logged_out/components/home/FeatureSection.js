import React from "react";
import { Typography } from "@mui/material";
import { withTheme } from "@mui/styles";
import illustration from '../../../assets/Illustration.png'
import './Own.css'

function FeatureSection() {

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          О нас
        </Typography>
        <div className="container-fluid" id="container_aboutUs">
          <img src={illustration} alt="" id="aboutUs_img"/>
          <p className="aboutUs_text">
            Наша основная задача - сделать процесс создания петиций быстрым, удобным и доступным для всех. Петиции - это мощный инструмент для выражения общественных запросов и требований, и мы верим, что каждый человек имеет право на голос в решении важных вопросов.
          </p>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {};

export default withTheme(FeatureSection);

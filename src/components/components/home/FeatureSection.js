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
          Цель создания сайта с петициями - объединить голоса людей для выражения общих убеждений и достижения изменений в различных областях. Мы стремимся разработать юридически правильно оформленные петиции и расширить возможности гражданского общества в улучшении законодательства. Нашей целью также является вовлечение граждан в активное взаимодействие с государством для достижения позитивных перемен.
          </p>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {};

export default withTheme(FeatureSection);

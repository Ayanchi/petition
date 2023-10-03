import React from "react";
import classNames from "classnames";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import './Own.css'

const styles = (theme) => ({
  containerFix: {
    [theme.breakpoints.down("lg")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  cardWrapper: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340,
    },
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360,
    },
  },
});

function PricingSection(props) {
  const { classes } = props;
  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Статистика
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <div
          container
          className={classes.gridContainer}
          id="count_progects"
        >
          <div id="card_count_progects">
            <h1>Пользователи</h1>
            <p id="projects_quantity" style={{fontSize: '30px'}}> <span style={{color: 'red'}}> + </span> 3000</p>
          </div>

          <div id="card_count_progects">
            <h1>Петиции</h1>
            <p id="projects_quantity" style={{fontSize: '30px'}}><span style={{color: 'blue'}}> + </span>5000</p>
          </div>

          <div id="card_count_progects">
            <h1>Заявки</h1>
            <p id="projects_quantity" style={{fontSize: '30px'}}><span style={{color: 'green'}}> + </span>10000</p>
          </div>
        
        </div>
      </div>
    </div>
  );
}

PricingSection.propTypes = {};

export default withStyles(styles, { })(PricingSection);

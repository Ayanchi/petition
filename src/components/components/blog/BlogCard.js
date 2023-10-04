import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Typography, Card, Box } from "@mui/material";
import image from '../../../assets/pettition.jpg'
import "./BlogPost.css"
import withStyles from '@mui/styles/withStyles';
import noImage from '../../../assets/icon-no-image.svg'

const styles = (theme) => ({
  img: {
    width: "100%",
    height: "auto",
    marginBottom: 8,
  },
  card: {
    boxShadow: theme.shadows[2],
  },
  noDecoration: {
    textDecoration: "none !important",
  },
  title: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    "&:active": {
      color: theme.palette.primary.dark,
    },
  },
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  showFocus: {
    "&:focus span": {
      color: theme.palette.secondary.dark,
    },
  },
});

function BlogCard(props) {
  const { classes, } = props;
  console.log(props.blog.fileDataResponse)

  return (
    <>
      <Card className={classes.card} id="card">
      {image && (
        <Link to={`blog/${props.blog.petitionId}`} tabIndex={-1}>
          <img src={(props.blog.fileDataResponse === null) ? noImage : props.blog.fileDataResponse} className={classes.img} alt="" />
        </Link>
      )}
      <Box p={2}>
        <Link to={`blog/${props.blog.petitionId}`}
          className={classNames(classes.noDecoration, classes.showFocus)}
        >
          <Typography variant="h6">
            <span className={classes.title}>{props.blog.name}</span>
          </Typography>
        </Link>
        <Typography id='link_text' variant="body1" color="textSecondary">
          {props.blog.description}
          <Link to={`blog/${props.blog.petitionId}`} className={classes.noDecoration} tabIndex={-1}>
            <span className={classes.link}> подробнее...</span>
          </Link>
        </Typography>
      </Box>
      </Card>
      <div style={{backgroundColor: 'red'}}>{props.name}</div>
  </>

    
  );
}

BlogCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BlogCard);

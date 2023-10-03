import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Button, Hidden, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import WaveBorder from "../../../shared/components/WaveBorder";
import ZoomImage from "../../../shared/components/ZoomImage";
import useMediaQuery from "@mui/material/useMediaQuery";
import pettition from '../../../assets/pettition.jpg'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { URL } from "../../../const/url";
import './Own.css'
import { AuthContext } from "../../../App";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("xl")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
});

function HeadSection(props) {
  const { classes, theme } = props;
  const [name, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFileData] = useState(null)
  const [successError, setSuccessError] = useState('')
  const [open, setOpen] = React.useState(false);
  const [publication, setPublication] = useState('')
  const [fileDataId, setFileDataId] = useState(0)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isAuth] = useContext(AuthContext)
  const [empty, setEmpty] = useState('')

  const isWidthUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleFileUpload = (event) => {
    // get the selected file from the input
    setFileData(event.target.files[0])
  }

  const formData = new FormData();
  formData.append("file", file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isAuth === null){
      return setEmpty(<Alert severity="error">войдите в систему</Alert>)
    }
    try {

      const responseImage = await axios.post(`${URL}/file/upload/image/publication`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        },
      )
      setFileDataId(responseImage.data.fileDataId)

      const response = await axios.post(`${URL}/publication/add`,
        {
          name,
          fileDataId,
          description,
        },
        {
           headers: {'Authorization': 'Bearer ' + isAuth}
        },
      )
      setPublication(response.data.petitionId)

      
      console.log(responseImage)
      console.log(response)
      setTitle('')
      setDescription('')
      handleClose()
      setSuccessError(<Alert severity="success">This is a success alert — check it out!</Alert>)
    
    } catch (error) {
      console.error('Error:', error);
      setSuccessError(<Alert severity="error">This is an error alert — check it out!</Alert>)
    }
  };
  

  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className={classNames(classes.containerFix, "container")}>
                <Box justifyContent="space-between" className="row">
                  <Grid item xs={12} md={5}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      height="100%"
                      sx={{margin: '20px'}}
                    >
                      <Box mb={4}>
                        <Typography variant={isWidthUpLg ? "h3" : "h4"}>
                          Здесь можно создать обсуждение
                        </Typography>
                      </Box>
                      <div>
                        <Box mb={2}>
                          <Typography
                            variant={isWidthUpLg ? "h6" : "body1"}
                            color="textSecondary"
                          >
                            ваше обсуждение будет создано и люди смогуть писать свои реакции к нему 
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          className={classes.extraLargeButton}
                          classes={{ label: classes.extraLargeButtonLabel }}
                          onClick={handleOpen}
                        >
                          Создать обсуждение
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                          <TextField 
                            value={name} 
                            onChange={(e) => setTitle(e.target.value)} 
                            id="standard-basic" 
                            label="Тема" 
                            variant="standard"
                            required
                          />
                          <TextField
                            onChange={handleFileUpload} 
                            type="file" 
                            id="standard-basic" 
                            label="File" 
                            variant="standard" 
                            required
                          />
                          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                          <Button onClick={handleSubmit}>создать</Button>
                          {empty}

                          </Box>
                        </Modal>
                        {successError}
                      </div>
                    </Box>
                  </Grid>
                  <Hidden mdDown>
                    <Grid item md={6}>
                      <ZoomImage
                        src={pettition}
                        className={classes.image}
                        alt="header example"
                        width="400px"
                      />
                    </Grid>
                  </Hidden>
                </Box>
              </div>
            </Card>
          </Box>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(HeadSection);

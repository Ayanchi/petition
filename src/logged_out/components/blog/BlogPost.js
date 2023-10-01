import React, {  useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import { Typography, Card, Box, Button } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ZoomImage from "../../../shared/components/ZoomImage";
import './BlogPost.css'
import '../comments/Comments.css'
import Comments from "../comments/Comments";
import { useParams } from "react-router-dom";
import { URL } from "../../../const/url";
import image from '../../../assets/pettition.jpg'
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import { blue } from "@mui/material/colors";

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  card: {
    boxShadow: theme.shadows[4],
  },
});

function BlogPost(props) {
  const { classes } = props;
  const {blogId} = useParams()

  const [liked, setLiked] = useState(localStorage.getItem('isLike') || false);
  const [blogInfoData, setBlogInfoData] = useState([])
  const token = localStorage.getItem('token')

  const [emptyComment, setEmptyComment] = useState('')
  const [fullComment, setFullComment] = useState('')
  const [comment, setComment] = useState('')
  const [commentData, setCommentData] = useState([])

  useEffect(() => {
    axios.get(`${URL}/publication/publication/byId/${blogId}`)
    .then((response) => {
      setBlogInfoData(response.data);
      })
    .catch((error) => {
      console.log(error)
    });
  },[liked])

  const handleSubmit = async () => {
    if(!token){
      return setEmptyComment(<Alert severity="error">войдите в систему</Alert>)
    }
    try {
      await axios.post(`${URL}/publication/likeToPublication/${blogId}`,
        {},
        {
          headers: {'Authorization': 'Bearer ' + token}
        },
      );
      localStorage.setItem('isLike', JSON.stringify(!liked))
      setLiked(!liked)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCommentSubmit = () => {
    if(!token){
      return setEmptyComment(<Alert severity="error">войдите в систему</Alert>)
    }
    if(comment.length !== 0){
      try {
        axios.post(`${URL}/comments/comment/toPublication/${blogId}`,
          comment,
          {
            headers: {'Authorization': 'Bearer ' + token},
          }
        )
        console.log('good')
        setFullComment(<Alert severity="success">удача</Alert>)
      } catch (error) {
        console.log(error)
      }
    }else return setEmptyComment(<Alert severity="error">заполните поле</Alert>)
  }

  useEffect(() => {
    axios.get(`${URL}/comments/getByPublicationId/${blogId}`)
    .then((response) => {
      setCommentData(response.data);
      })
    .catch((error) => {
      console.log(error);
    });
  },[])

  console.log(JSON.parse(liked))


  return (
    <div>
      <Box
        className={classNames("lg-p-top", classes.wrapper)}
        display="flex"
        justifyContent="center"
      >
        <div className={classes.blogContentWrapper}>
          <Card className={classes.card}>
            <Box pt={3} pr={3} pl={3} pb={2}>
              <Typography variant="h4">
                <b>{blogInfoData.name}</b>
              </Typography>
              {/* <Typography variant="body1" color="textSecondary">
                {format(new Date(date * 1000), "PPP", {
                  awareOfUnicodeTokens: true,
                })}
              </Typography> */}
            </Box>
            <ZoomImage className={classes.img} src={image} alt="" />
            <Box p={3}>
              {blogInfoData.description}
              <Box pt={2}>
                <Button
                  startIcon={<ThumbUpIcon style={{ color: liked ? "#ffc107" : "grey" }} />}
                  onClick={() => handleSubmit()}
                >
                  Пост нравится {blogInfoData.countSign} людям
                </Button>
                {emptyComment}
              </Box>
            </Box>
          </Card>
        </div>
          {commentData.length === 0 && <>no comments</> }
          {commentData.map((el) => (
            <Comments props={el}/>
          ))}
        <div className="comment-input-container">
          <textarea
            className="comment-input"
            placeholder="Оставьте свой комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button className="send-button" onClick={() => handleCommentSubmit()}>
            <SendIcon style={{ color: blue[500] }} />
          </button>
        </div>
        
        
      </Box>
      {emptyComment}
      {fullComment}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(BlogPost);
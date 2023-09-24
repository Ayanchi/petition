import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import format from "date-fns/format";
import { Typography, Card, Box, Button } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ZoomImage from "../../../shared/components/ZoomImage";
import Comments from "../comments/Comments";
import { URL } from "./const/url";
import "./BlogPost.css";
import axios from 'axios';

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
  const { classes, date, title, src, content, postId, currentLang } = props;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [setLoading] = useState(true);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${URL}comments/getByPetitionId`);
      setComments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при запросе данных:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [currentLang, postId]);

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
                <b>{title}</b>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {format(new Date(date * 1000), "PPP", {
                  awareOfUnicodeTokens: true,
                })}
              </Typography>
            </Box>
            <ZoomImage className={classes.img} src={src} alt="" />
            <Box p={3}>
              {content}
              <Box pt={2}>
                <Button
                  startIcon={
                    <ThumbUpIcon style={{ color: liked ? "blue" : "grey" }} />
                  }
                  onClick={handleLike}
                  className="liked-post"
                >
                  Пост нравится {likeCount} людям
                </Button>
              </Box>
            </Box>
          </Card>
        </div>
        <Comments comments={comments} />
      </Box>
    </div>
  );
}

BlogPost.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  postId: PropTypes.number.isRequired,
  currentLang: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(BlogPost);

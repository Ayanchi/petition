import React, { useState, useContext } from "react";
import "./Comments.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { URL } from "../../../const/url";
import axios from "axios";
import { Alert } from "@mui/material";
import { AuthContext } from "../../../App"; 
import { CommentContext } from "../blog/BlogPost";


export default function Comments({props}) {
  const [isAuth] = useContext(AuthContext)
  const [isOnFire1, setIsOnFire1] = useContext(CommentContext)


  const [localOnFire, setLocalOnFire] = useState(false)

  const [emptyComment, setEmptyComment] = useState('')


  const handleCommentLikeSubmit = async(ID) => {
    if(isAuth === null){
      return setEmptyComment(<Alert severity="error">войдите в систему</Alert>)
    }
    try {
      await axios.post(`${URL}/comments/like/${ID}` ,
        {},
        {
          headers: {'Authorization': 'Bearer ' + isAuth},
        }
      
      )
      console.log('good')
      setLocalOnFire(!localOnFire)
      setIsOnFire1(localOnFire)
      console.log(localOnFire)

    } catch (err) {
      console.log(err)

    }
  }


  return (
    <div className="comments-container">
      <h2 className="comments-title">Комментарии</h2>
      
      <div className="comment">
        <div className="comment-header">
          <div className="user-avatar">Avatar</div>
          <div className="user-info">
            <p className="user-name">{props.senderFirstname} {props.senderLastname}</p>
          </div>
        </div>
        <p className="comment-text">
          {props.comment}
        </p>
        <div className="comment-actions">
          <button className="fire-button" onClick={() => handleCommentLikeSubmit(props.id)}>
            <LocalFireDepartmentIcon style={{ color: localOnFire ? "#ff5722" : "#000000" }} />
            <span className="fire-counter">{props.likeCount}</span>
          </button>
        </div>
      </div>
      {emptyComment}

    </div>
  );
}

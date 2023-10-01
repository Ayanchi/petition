import React, { useState } from "react";
import "./Comments.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { URL } from "../../../const/url";
import axios from "axios";
import { Alert } from "@mui/material";

export default function Comments(props) {

  const [isOnFire1, setIsOnFire1] = useState(false);

  const token = localStorage.getItem('token')

  const [emptyComment, setEmptyComment] = useState('')

  const handleCommentLikeSubmit = (ID) => {
    if(!token){
      return setEmptyComment(<Alert severity="error">войдите в систему</Alert>)
    }
    try {
      axios.post(`${URL}/comments/like/${ID}` ,
        {},
        {
          headers: {'Authorization': 'Bearer ' + token},
        }
      
      )
      console.log('good')
      setIsOnFire1(!isOnFire1);

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
            <p className="user-name">{props.props.senderFirstname} {props.props.senderLastname}</p>
          </div>
        </div>
        <p className="comment-text">
          {props.props.comment}
        </p>
        <div className="comment-actions">
          <button className="fire-button" onClick={() => handleCommentLikeSubmit(props.props.id)}>
            <LocalFireDepartmentIcon style={{ color: isOnFire1 ? "#ff5722" : "#000000" }} />
            <span className="fire-counter">{props.props.likeCount}</span>
          </button>
        </div>
      </div>
      {emptyComment}

    </div>
  );
}

import React, { useState } from "react";
import "./Comments.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SendIcon from "@mui/icons-material/Send";
import { blue } from "@mui/material/colors";


export default function Comments() {
  const [fireCount1, setFireCount1] = useState(0);
  const [isOnFire1, setIsOnFire1] = useState(false);

  const [fireCount2, setFireCount2] = useState(0);
  const [isOnFire2, setIsOnFire2] = useState(false);

  const toggleFire1 = () => {
    if (isOnFire1) {
      setFireCount1(fireCount1 - 1);
    } else {
      setFireCount1(fireCount1 + 1);
    }
    setIsOnFire1(!isOnFire1);
  };

  const toggleFire2 = () => {
    if (isOnFire2) {
      setFireCount2(fireCount2 - 1);
    } else {
      setFireCount2(fireCount2 + 1);
    }
    setIsOnFire2(!isOnFire2);
  };

  const fireColor1 = isOnFire1 ? "#ff5722" : "#000000";
  const fireColor2 = isOnFire2 ? "#ff5722" : "#000000";

  return (
    <div className="comments-container">
      <h2 className="comments-title">Комментарии</h2>

      <div className="comment">
        <div className="comment-header">
          <div className="user-avatar">Avatar</div>
          <div className="user-info">
            <p className="user-name">Username</p>
          </div>
        </div>
        <p className="comment-text">
          "Я полностью поддерживаю инициативу по увеличению финансирования
          образования в Кыргызстане. Это действительно критически важное
          направление для нашей страны. Однако, помимо повышения заработной
          платы учителей и модернизации инфраструктуры, было бы замечательно
          видеть также улучшение программ обучения, более тесное взаимодействие
          с предприятиями для подготовки кадров, а также поддержку и развитие
          научных исследований. Эти шаги помогли бы укрепить образовательную
          систему Кыргызстана и подготовить наших студентов к вызовам будущего."
        </p>
        <div className="comment-actions">
          <button className="fire-button" onClick={toggleFire1}>
            <LocalFireDepartmentIcon style={{ color: fireColor1 }} />
            <span className="fire-counter">{fireCount1}</span>
          </button>
        </div>
      </div>

      <div className="comment">
        <div className="comment-header">
          <div className="user-avatar">Bird</div>
          <div className="user-info">
            <p className="user-name">Username</p>
          </div>
        </div>
        <p className="comment-text">
          "Согласен с необходимостью более прозрачного использования средств в
          образовании. Прозрачность и ответственность в расходовании бюджета -
          это залог эффективного управления и достижения поставленных целей.
          Было бы замечательно видеть более подробные отчеты о том, как
          расходуются средства в образовании, и какие конкретные улучшения
          достигнуты благодаря этим инвестициям. Это также способствует доверию
          граждан к системе образования и государственным институтам."
        </p>
        <div className="comment-actions">
          <button className="fire-button" onClick={toggleFire2}>
            <LocalFireDepartmentIcon style={{ color: fireColor2 }} />
            <span className="fire-counter">{fireCount2}</span>
          </button>
        </div>
      </div>

      <div className="comment-input-container">
        <textarea
          className="comment-input"
          placeholder="Оставьте свой комментарий"
        ></textarea>
        <button className="send-button">
          <SendIcon style={{ color: blue[500] }} />
        </button>
      </div>
    </div>
  );
}

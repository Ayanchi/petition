import React, { Fragment } from "react";
import { Typography } from "@mui/material";

const snippet = (
  <Fragment>
    <Typography variant="h6" paragraph>
      Уважаемые государственные органы Кыргызстана! Мы, граждане Кыргызстана,
      обращаемся к вам с просьбой о повышении финансирования образования в нашей
      стране. Образование - это краеугольный камень развития нации, и мы
      считаем, что учительская профессия должна быть признана и поддержана
      соответствующим образом. В настоящее время структура финансирования
      образования требует серьезных улучшений.
    </Typography>
  </Fragment>
);

const content = (
  <Fragment>
    <Typography variant="h6" paragraph>
      Уважаемые государственные органы Кыргызстана! Мы, граждане Кыргызстана,
      обращаемся к вам с просьбой о повышении финансирования образования в нашей
      стране. Образование - это краеугольный камень развития нации, и мы
      считаем, что учительская профессия должна быть признана и поддержана
      соответствующим образом. В настоящее время структура финансирования
      образования требует серьезных улучшений.
    </Typography>

    <Typography variant="h6" paragraph>
      Подтема 1: Увеличение заработной платы учителей
    </Typography>
    <Typography paragraph>
      Несмотря на то, что учителя играют важную роль в будущем нашей страны,
      многие из них сталкиваются с низкой заработной платой, что может
      отразиться на качестве образования. Повышение заработной платы учителей
      имеет следующие преимущества:
    </Typography>

    <Typography paragraph>
      1. Поддержание высокой мотивации учителей и привлечение
      высококвалифицированных специалистов в профессию.
    </Typography>
    <Typography paragraph>
      2. Улучшение качества образования и развитие научно-исследовательской
      работы.
    </Typography>
    <Typography paragraph>
      3. Снижение уровня коррупции в системе образования.
    </Typography>

    <Typography variant="h6" paragraph>
      Подтема 2: Современные образовательные технологии и инфраструктура
    </Typography>
    <Typography paragraph>
      Современные образовательные учреждения должны обеспечивать доступ к
      передовым технологиям и современной инфраструктуре. Это включает в себя:
    </Typography>
    <Typography paragraph>
      1. Обновление учебных программ и внедрение современных образовательных
      методик. 2. Поддержку и развитие дистанционного обучения и
      онлайн-ресурсов. 3. Модернизацию учебных заведений, включая лаборатории и
      библиотеки.
    </Typography>
    <Typography paragraph>
      2. Поддержку и развитие дистанционного обучения и онлайн-ресурсов.
    </Typography>
    <Typography paragraph>
      3. Модернизацию учебных заведений, включая лаборатории и библиотеки.
    </Typography>

    <Typography variant="h6" paragraph>
      Подтема 3: Прозрачность и эффективность расходования бюджета
    </Typography>
    <Typography paragraph>
      Мы также призываем к улучшению прозрачности и эффективности расходования
      бюджета на образование. Необходимо:
    </Typography>

    <Typography paragraph>
      1. Обеспечение контроля за целевым использованием средств в образовании.
    </Typography>
    <Typography paragraph>
      2. Регулярное аудиторское обследование расходования бюджета образования.
    </Typography>
    <Typography paragraph>
      3. Публикация отчетов о расходах и действиях для обеспечения открытости и
      ответственности.
    </Typography>
  </Fragment>
);

const posts = [
  {
    title: "Повышение финансирования образования в Кыргызстане",
    id: 1,
    date: 1576281500,
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost1.jpg`,
    snippet: snippet,
    content: content,
  },
  {
    title: "Post 2",
    id: 2,
    date: 1576391600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost2.jpg`,
    snippet: snippet,
    content: content,
  },
  {
    title: "Post 3",
    id: 3,
    date: 1577391600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost3.jpg`,
    snippet: snippet,
    content: content,
  },
  {
    title: "Post 4",
    id: 4,
    date: 1572281600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost4.jpg`,
    snippet: snippet,
    content: content,
  },
  {
    title: "Post 5",
    id: 5,
    date: 1573281600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost5.jpg`,
    snippet: snippet,
    content: content,
  },
  {
    title: "Post 6",
    id: 6,
    date: 1575281600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost6.jpg`,
    snippet: snippet,
    content: content,
  },
];

export default posts;

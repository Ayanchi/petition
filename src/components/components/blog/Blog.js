import React from "react";
import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../const/url";
import './BlogPost.css'

// const styles = (theme) => ({
//   blogContentWrapper: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(4),
//       marginRight: theme.spacing(4),
//     },
//     maxWidth: 1280,
//     width: "100%",
//   },
//   wrapper: {
//     minHeight: "60vh",
//   },
//   noDecoration: {
//     textDecoration: "none !important",
//   },
// });

// function getVerticalBlogPosts() {
//   const gridRows = [[], [], []];
//   let rows;
//   let xs;
//   if (isWidthUpMd) {
//     rows = 3;
//     xs = 4;
//   } else if (isWidthUpSm) {
//     rows = 2;
//     xs = 6;
//   } else {
//     rows = 1;
//     xs = 12;
//   }

//     <BlogCard
//     />



//   return gridRows.map((element, index) => (
//     <Grid key={index} item xs={xs}>
//       {element}
//     </Grid>
//   ));
// }

// function Blog(props) {
//   const { classes, selectBlog } = props;

//   const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
//   const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

//   useEffect(() => {
//     selectBlog();
//   }, [selectBlog]);

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       className={classNames(classes.wrapper, "lg-p-top")}
//     >
//       <div className={classes.blogContentWrapper}>
//         <Grid container spacing={3}>
//           {getVerticalBlogPosts}
//         </Grid>
//       </div>
//     </Box>
//   );
// }

// Blog.propTypes = {
//   selectBlog: PropTypes.func.isRequired,
//   classes: PropTypes.object.isRequired,
//   blogPosts: PropTypes.arrayOf(PropTypes.object),
// };

// export default withStyles(styles, { withTheme: true })(Blog);


export default function Blog(){
  const [publicationData, setPublicationData] = useState([])

  useEffect(() => {
    axios.get(`${URL}/publication/allPublications`)
    .then((response) => {
      setPublicationData(response.data);
      })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  return(
    <div style={{marginTop: '100px'}} className="main_blogcard">
      {publicationData.map((el) => (
        <div key={el.id} className="blogcard">
          <BlogCard blog={el} key={el.id}/>
        </div>
      ))}
    </div>
  )
}
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import Blog from "./blog/Blog";
import Petitions from "./petition/Petition";
import InfoPetition from "./infoPetition/InfoPetition";
import Regist from "./rigist/Regist";
import Login from "./login/Login";
import BlogPost from "./blog/BlogPost";
import AdminAuth from "./adminAuth/AdminAuth";
import Paperbase from "./adminPage/PaperbasePublic";
import PaperbasePetish from "./adminPage/PaperbasePetish";
import PaperbasePublick from "./adminPage/PaperbasePublic";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome } = props;
  const isAuth = localStorage.getItem('token')
  const isAdmin = localStorage.getItem('admin')

  return (
    <Switch>
      
      <PropsRoute exact path="/" component={Home} selectHome={selectHome} />

      <PropsRoute
      path="/blog/:blogId"
      component={BlogPost}
      />

      <PropsRoute
      path="/blog"
      component={Blog}
      selectBlog={selectBlog}
      blogPosts={blogPosts}
      />
    
    <PropsRoute path="/petition/:petId" component={InfoPetition} />
    <PropsRoute path="/petition" component={Petitions} />

    <PropsRoute path="/adminPage/patition" component={PaperbasePetish} />
    <PropsRoute path="/adminPage/publication" component={PaperbasePublick} />
    <PropsRoute path="/adminPage" component={Paperbase} />

    {(!isAuth || !isAdmin) && (
      <>
        <PropsRoute path='/login' component={Login} />
        <PropsRoute path='/regist' component={Regist} />
        <PropsRoute path='/admin' component={AdminAuth} />
      </>
    )}

    </Switch>
    
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);

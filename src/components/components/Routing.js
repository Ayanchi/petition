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
import Paperbase from "./adminPage/PaperbasePublic";
import PaperbasePetish from "./adminPage/PaperbasePetish";
import PaperbasePublick from "./adminPage/PaperbasePublic";
import { useContext } from "react";
import { AdminRoleContext } from "../../App.js";
import { AuthContext } from "../../App.js";
import NotFound from "./notFound/NotFound";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome } = props;
  const [ adminRole ] = useContext(AdminRoleContext);
  const [ isAuth ] = useContext(AuthContext)

  console.log(isAuth)


  return (
    <Switch>
      
      <PropsRoute exact path="/" component={Home} selectHome={selectHome} />
      <PropsRoute path="/blog/:blogId" component={BlogPost} />
      <PropsRoute path="/blog" component={Blog} selectBlog={selectBlog} blogPosts={blogPosts} />
      <PropsRoute path="/petition/:petId" component={InfoPetition} />
      <PropsRoute path="/petition" component={Petitions} />
          
      
      {(isAuth === null) && (
        <>
          <PropsRoute path='/login' component={Login} />
          <PropsRoute path='/regist' component={Regist} />
        </>
      )}

      {(adminRole === 'ADMIN') && 
          <>
            <PropsRoute path="/adminPage/patition" component={PaperbasePetish} />
            <PropsRoute path="/adminPage/publication" component={PaperbasePublick} />
            <PropsRoute path="/adminPage" exact component={Paperbase} />
            <PropsRoute path="*" component={NotFound}/>
          </>
      }

    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);

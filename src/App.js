import React, { Fragment, Suspense, lazy, useState, useEffect } from "react";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import { createContext } from "react";
import { useHistory } from "react-router-dom";

const LoggedOutComponent = lazy(() => import("./components/components/Main"));

export const AuthContext = createContext()
export const AdminRoleContext = createContext()

function App() {
  const [isAuth, setIsAuth] = useState(null)
  const [adminRole, setAdminRole] = useState(null)

  const token = localStorage.getItem('token')
  const admin = localStorage.getItem('role')

  const history = useHistory()

  useEffect(() => {
    setAdminRole(JSON.parse(admin))
    setIsAuth(JSON.parse(token))
  },[])

  useEffect(() => {
    if(token){
      
    
      const parts = token.split(".");
      const payload = parts[1];

      const decodedPayload = atob(payload);

      const payloadObj = JSON.parse(decodedPayload);

      const expirationTimeUnix = payloadObj.exp;
      const expirationDate = new Date(expirationTimeUnix * 1000);
      const formattedExpiration = expirationDate.toLocaleString();

      const currentTimeUnix = Math.floor(Date.now() / 1000);


      console.log(formattedExpiration)

      // 1696187278
      // 1696481421

      if (expirationTimeUnix < currentTimeUnix) {
        console.log("Токен истек");
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        history.push('/login')
      } else {
        console.log("Токен действителен");
      }
    }
  },[])


  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      <AdminRoleContext.Provider value={[adminRole, setAdminRole]}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Pace color={theme.palette.primary.light} />
            <Suspense fallback={<Fragment />}>
              <Switch>
                <Route>
                  <LoggedOutComponent />
                </Route>
              </Switch>
            </Suspense>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
      </AdminRoleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

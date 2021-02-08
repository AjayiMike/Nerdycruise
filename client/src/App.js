import {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "./styles/globalStyles.scss"
import Home from "./routes/Home"
import Header from "./components/Header"
import SideNav from "./components/SideNav"
import Footer from "./components/Footer"
import DashboardContainer from "./routes/DashboardContainer"
import Test from "./routes/Test"
import Forum from "./routes/Forum"
import Login from "./routes/Login"
import Register from "./routes/Register"
import ForgotPassword from "./routes/ForgotPassword"
import AccountActivation from "./routes/AccountActivation"
import ResetPassword from "./routes/ResetPassword"
import PageNotFound from "./routes/404"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {UserContext} from "./context/UserContext";
import axios from "axios";
 
function App() {


  const [userData, setUserData] = useState({})

  const loadUser = () => {
    if(!localStorage.getItem("accessToken")) {
        delete axios.defaults.headers.common['Authorization']
        setUserData({
          id: null,
          username: null,
          email: null,
          avatar_url: null
        })
        return;
    }


    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`

    axios.get("api/user")
    .then(res => {
        if(!res.data.status) return setUserData({
          id: null,
          username: null,
          email: null,
          avatar_url: null
        })

        setUserData(res.data.userData)
    })
    .catch(err => {
        setUserData({
          id: null,
          username: null,
          email: null,
          avatar_url: null
        })
    })
  }


  useEffect(() => {

    loadUser()

  }, [])

  // this states are used to toggle between hidding/showing of the side nav on small screens
  const [showSideNaV, setShowSideNav] = useState(false)
  // const [isSmallScreen, setIsSmallScfreen] = useState(true)
  
  // handles showing/hiding side nav on small screens
  const handleShowSideNav = () => {
    const sideNavContainer = document.querySelector(".side-nav-container");
    const sideNav = document.querySelector(".side-nav");
    if(!showSideNaV) {
      sideNavContainer.classList.add("side-nav-container-show")
      sideNav.classList.contains("slide-out") ? sideNav.classList.replace("slide-out", "slide-in") : sideNav.classList.add("slide-in");
      setShowSideNav(true)
    } else {
      // this setTimeout ensures the sideNav has finished sliding out before the backdrop is gone
      setTimeout(() => {
        sideNavContainer.classList.remove("side-nav-container-show")
      }, 300)
      sideNav.classList.replace("slide-in", "slide-out")
      setShowSideNav(false)
    }
  }

  


  return (
      <Router>
        <UserContext.Provider value = {{userData, setUserData, loadUser}} >

          <Header handleShowSideNav = {handleShowSideNav} />
          <SideNav handleShowSideNav = {handleShowSideNav} />
          <Switch>
            <Route exact path = "/">
              <Home />
            </Route>
            <Route path = "/test">
              <Test />
            </Route>
            <Route path = "/forum">
              <Forum />
            </Route>
            <Route path = "/signin">
              <Login />
            </Route>
            <Route path = "/signup">
              <Register />
            </Route>
            <Route path = "/dashboard">
              <DashboardContainer />
            </Route>
            <Route path = "/user/account/activation/:userDetailsToken/:usernameToken" >
              <AccountActivation />
            </Route>
            <Route path = "/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path = "/user/account/reset-password/:uidToken">
              <ResetPassword />
            </Route>
            <Route path = "*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />

        </UserContext.Provider>
      </Router>
  );
}

export default App;

import {useState, useEffect, useContext} from "react";
import logo from "../images/nerdycruise_logo.png";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import "../styles/header.scss";
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../context/UserContext";


const Header = ({handleShowSideNav}) => {

    const {userData} = useContext(UserContext)
    const history = useHistory()

    const [isSmallScreen, setIsSmallScreen] = useState();
    useEffect(() => {
        if(window.screen.width < 992) {
            setIsSmallScreen(true)
        } else {
            setIsSmallScreen(false)
        }
    }, [])

    const onResize = () => {
        if (window.screen.width >= 992) {
            setIsSmallScreen(false);
        } else {
            setIsSmallScreen(true);
        }
    }

    window.addEventListener("resize", onResize);

    const gotoDashboard = () => {
        history.push("/dashboard")
    }

    return (
        <header>
            {isSmallScreen ? <>
                <MenuIcon className = "menuHamburger" onClick = {handleShowSideNav} />
                <div className = "logo">
                    <img src = {logo} alt = "nerdycruise logo" className = "logo-image" />
                </div>
                {userData.id ? 
                <div className = "user-account-icons">
                    <div className = "notification-container">
                        <NotificationsIcon className = "notification-icon" />
                        <span className = "notification-badge">9</span>
                    </div>
                    <div className = "user-profile-image-container" onClick = {gotoDashboard}>
                        <img src = {userData.avatar_url} alt = "user-account" />
                    </div>
                </div> : null}
            </> : <>
            <div className = "logo">
                    <img src = {logo} alt = "nerdycruise logo" className = "logo-image" />
                    <p className = "logo-text">Nerdycruise</p>
                </div>
                <nav className = "large-screen-nav">
                    <Link to = "/" className = "nav-link" >Home</Link>
                    <Link to = "/test" className = "nav-link" >Take test</Link>
                    <Link to = "/forum" className = "nav-link" >Forum</Link>
                </nav>
                {userData.id ? 
                    <div className = "user-account-icons">
                        <div className = "notification-container">
                            <NotificationsIcon className = "notification-icon" />
                            <span className = "notification-badge">9</span>
                        </div>
                        <div className = "user-profile-image-container" onClick = {gotoDashboard}>
                            <img src = {userData.avatar_url} alt = "user-account" />
                        </div>
                    </div> :  
                    <div className = "large-screen-button-group">
                        <Link to = "/signin" className = "gen-btn btn-login">Login</Link>
                        <Link to = "/signup" className = "gen-btn btn-register">Register</Link>
                    </div>
                }
                
            </> }
            
        </header>
    )
}

export default Header
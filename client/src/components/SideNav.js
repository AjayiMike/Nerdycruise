import {useContext} from "react";
import ArrowBack from '@material-ui/icons/ArrowBack';
import "../styles/sideNav.scss";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import logo from "../images/nerdycruise_logo.png";
 

const SideNav = ({handleShowSideNav}) => {
    const {userData} = useContext(UserContext)


    const SlideOutOnBackdropClick = (e) => {
        if(e.target === document.querySelector(".side-nav-container")) {
            handleShowSideNav();
        }
    }

    const SlideOutOnLinkClick = (e) => {
        setTimeout(() => handleShowSideNav(), 500 )
            
        
    }

    return (
        <div className = "side-nav-container" onClick = {e => SlideOutOnBackdropClick(e)}> 
            <div className = "side-nav">
                <ArrowBack className = "arrow-back" onClick = {handleShowSideNav} />
                <div className = "sideNav-header">
                    <div className = "sideNav-profile-pic">
                        {userData.id ?
                        <>
                            <img src = {userData.avatar_url} alt = "user-profile" className = "profile-pic" />
                            <p className = "username">{userData.username}</p>
                        </> : 
                        <>
                            <img src = {logo} alt = "nerdycruise logo" className = "logo" />
                            <p className = "website-name">Nerdycruise</p>
                        </>}
                    </div>
                </div>
                
                {userData.id ? "" : 
                <div className = "button-group">
                    <Link to = "/signin" className = "gen-btn btn-login" onClick = {SlideOutOnLinkClick}>Login</Link>
                    <Link to = "/signup" className = "gen-btn btn-register" onClick = {SlideOutOnLinkClick}>Register</Link>
                </div>}
                <nav>
                    <Link to = "/" className = "nav-link" onClick = {SlideOutOnLinkClick}>Home</Link>
                    <Link to = "/test" className = "nav-link" onClick = {SlideOutOnLinkClick}>Take test</Link>
                    <Link to = "/forum" className = "nav-link" onClick = {SlideOutOnLinkClick}>Forum</Link>
                </nav>
            </div>
        </div>
    )
}

export default SideNav;

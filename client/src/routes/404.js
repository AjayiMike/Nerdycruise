import React from 'react'
import pageNotFoundImage from "../images/404.svg";
import {Link} from "react-router-dom"
import "../styles/404.scss";

const PageNotFound = () => {
    return (
        <div>
            <div className = "page page-container">
                
                <img src = {pageNotFoundImage} className = "page-not-found-image" alt = "page not found" />
                
                <p className = "page-not-found-text">oops! looks like the resource you are looking for does not exist</p>

                <Link to = "/" className = "gen-btn btn">take me home</Link>
                
            </div>
        </div>
    )
}

export default PageNotFound

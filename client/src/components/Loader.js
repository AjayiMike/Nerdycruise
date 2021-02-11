import React from 'react'
import { ImSpinner10 } from 'react-icons/im';
import {IconContext} from "react-icons";
import "../styles/loader.scss"

const Loader = () => {
    return (
        <div className = "loader-page">
            <IconContext.Provider value = {{className: "spin loader"}}><ImSpinner10 /></IconContext.Provider>           
        </div>
    )
}

export default Loader

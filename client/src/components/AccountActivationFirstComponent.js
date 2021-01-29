import React from 'react'
import {IconContext} from "react-icons"
import { ImSpinner10 } from 'react-icons/im';

const AccountActivationFirstComponent = ({name, ActivateAcc, disableBtn}) => {
    return (
        <div className = "accout-activation-main-content first-page">
            <h3>WELCOME <span>{name}</span></h3>
            <p>click on the button below to activate your account</p>
            <button onClick = {ActivateAcc} disabled = {disableBtn} type = "button" className = "account-activation-btn">{disableBtn ? <IconContext.Provider value = {{className: "icon spin"}}><ImSpinner10 /></IconContext.Provider> : "ACTIVATE"}</button>
        </div>
    )
}

export default AccountActivationFirstComponent

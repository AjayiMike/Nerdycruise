import React from 'react'
import {HandleLabelPosition} from "../helper functions"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {IconContext} from "react-icons"
import { ImSpinner10 } from 'react-icons/im';

const ResetPasswordFirstComponent = ({usernameOrEmail, HandleInputChange, HandleSubmit, disableBtn, errMsg, requestErrMsg}) => {
    return (
        <div className = "forgot-password-main-content">
            <h1 className = "header">FORGOT PASSWORD</h1>
            <form className = "forgot-password-form" onSubmit = {HandleSubmit}>
                <p>Enter your username or email to reset your password</p>
                <p className = "request-err-msg">{requestErrMsg}</p>
                <div className = "formGroup">
                    <PersonOutlineIcon className = "input-icon" />
                    <label htmlFor = "usernameOrEmail">username or email</label>
                    <input type = "text" name = "usernameOrEmail" className = "usernameOrEmail" id = "usernameOrEmail" value = {usernameOrEmail} onChange = {HandleInputChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition} />
                    <p className = "err-message">{errMsg !== "no error" ? errMsg : null }</p>
                </div>
                <button type = "submit" className = "submit-btn" disabled = {disableBtn}>{disableBtn ? <IconContext.Provider value = {{className: "spin icon"}}><ImSpinner10 /></IconContext.Provider> : "SUBMIT" }</button>
            </form>
        </div>
    )
}

export default ResetPasswordFirstComponent

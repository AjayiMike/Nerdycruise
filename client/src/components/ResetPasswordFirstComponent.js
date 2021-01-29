import React from 'react'
import {HandleLabelPosition} from "../helper functions"
import {IconContext} from "react-icons"
import { ImSpinner10 } from 'react-icons/im';

const ResetPasswordFirstComponent = ({onChange, data, handleSubmit, requestErr, disableBtn}) => {
    return (
        <div className = "reset-password-main-content">
            <h1 className = "header">PASSWORD RESET</h1>
            <p>enter your new password</p>
            <form className = "reset-password-form" onSubmit = {handleSubmit}>
                <div className = "formGroup">
                    <label htmlFor = "password">Password</label>
                    <input type = "password" className = "password" id = "password" name = "password" value = {data.password} onChange = {onChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition} />
                    <p className = "err-message">{data.formErrors.password === "no error" ? "" : data.formErrors.password }</p>
                </div>
                <div className = "formGroup">
                    <label htmlFor = "password">Confirm Password</label>
                    <input type = "password" className = "confirm-password" id = "confirm-password" name = "confirmPassword" value = {data.confirmPassword} onChange = {onChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition} />
                    <p className = "err-message">{data.formErrors.confirmPassword === "no error" ? "" : data.formErrors.confirmPassword }</p>
                </div>
                <button type = "submit" className = "password-reset-submit-btn" disabled = {disableBtn}>{disableBtn? <IconContext.Provider value = {{className: "spin icon"}}><ImSpinner10 /></IconContext.Provider> : 'RESET PASSWORD' }</button>
                <p className = "requestErr">{requestErr}</p>
            </form>
        </div>
    )
}

export default ResetPasswordFirstComponent

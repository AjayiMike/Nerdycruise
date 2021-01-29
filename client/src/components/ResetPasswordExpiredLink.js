import React from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ResetPasswordExpiredLink = ({GotoForgotPasswordPage}) => {
    return (
        <div className = "expired-link-page">
            <h1>EXPIRED LINK <ErrorOutlineIcon className = "icon" /></h1>
            <p>sorry, your password reset link has expired. please request a new link</p>
            <button className = "goto-forgot-password-btn" onClick = {GotoForgotPasswordPage}>FORGOT PASSWORD</button>
        </div>
    )
}

export default ResetPasswordExpiredLink
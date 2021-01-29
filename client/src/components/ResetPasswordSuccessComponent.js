import React from 'react'

const ResetPasswordSuccessComponent = ({GotoLoginPage}) => {
    return (
        <div className = "success-page">
            <p>You have successfully reset your password</p>
            <button className = "goto-login-btn" onClick = {GotoLoginPage}>LOGIN</button>
        </div>
    )
}

export default ResetPasswordSuccessComponent

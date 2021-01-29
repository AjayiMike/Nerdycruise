import React from 'react'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const AccountActivationSuccessComponent = ({name, GotoLoginPage}) => {
    return (
        <div className = "account-activation-main-content success-page">
            <h3>{name} <VerifiedUserIcon /></h3>
            <p>you can now login into your account</p>
            <button onClick = {GotoLoginPage} type = "button" className = "goto-login-btn">LOGIN</button>
        </div>
    )
}

export default AccountActivationSuccessComponent

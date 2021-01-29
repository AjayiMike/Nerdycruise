import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const AccountActivationExpiredLink = ({GotoRegisterPage}) => {
    return (
        <div className = "account-activation-main-content expired-link-page">
            <h1>EXPIRED LINK <ErrorOutlineIcon className = "icon" /></h1>
            <p>sorry, your account activation link has expired. please register again</p>
            <button className = "goto-register-btn" onClick = { GotoRegisterPage}>REGISTER</button>
        </div>
    )
}

export default AccountActivationExpiredLink

import React from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const RegistrationSuccessComponent = () => {
    return (
        <div className = "reg-success">
            <MailOutlineIcon className = "mail-icon" />
            <p>your account activation link has been sent to your email</p>
        </div>
    )
}

export default RegistrationSuccessComponent

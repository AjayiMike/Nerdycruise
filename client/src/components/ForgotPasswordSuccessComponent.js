
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const ForgotPasswordSuccessComponent = ({serverResponse}) => {
    return (
        <div className = "success-page">
            <MailOutlineIcon className = "mailIcon" />
            <p>{serverResponse}</p>
        </div>
    )
}

export default ForgotPasswordSuccessComponent

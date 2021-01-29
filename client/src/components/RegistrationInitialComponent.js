
import OauthComponent from "../components/OauthComponent";
import "../styles/register.scss";
import {Link} from "react-router-dom";
import {IconContext} from "react-icons"
import { ImSpinner10 } from 'react-icons/im';
import {RiEyeCloseLine, RiEyeLine} from 'react-icons/ri'
import {HandleLabelPosition} from "../helper functions"


const RegistrationInitialComponent = ({
    HandleSubmit,
    registerInputs,
    HandleInputChange,
    serverErrMsg,
    disableBtn,
    showPassword,
    togglePasswordShowHide
}) => {

    return (
        <div className = "register-main-content">
                <h2 className = "header">Let's Get Started</h2>
                <form className = "register-form container" autoComplete = "off" noValidate onSubmit = {HandleSubmit}>
                    <div className = "row">
                        <div className = "formGroup col-12 col-sm-6">
                            <label htmlFor = "email">Email Address</label>
                            <input type = "email" className = "email" id = "email" name = "email" value = {registerInputs.email} onChange = {HandleInputChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition} />
                            <p className = "err-message">{registerInputs.formErrors.email === "no error" ? "" : registerInputs.formErrors.email }</p>
                        </div>
                        <div className = "formGroup col-12 col-sm-6">
                            <label htmlFor = "username">Choose Username</label>
                            <input type = "text" className = "username" id = "username" name = "username" value = {registerInputs.username} onChange = {HandleInputChange}  onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition}/>
                            <p className = "err-message">{registerInputs.formErrors.username === "no error" ? "" : registerInputs.formErrors.username }</p>
                        </div>

                        <div className = "formGroup col-12 col-sm-6">
                            <IconContext.Provider value = {{className: "icon"}}>{showPassword ? <RiEyeLine onClick = {togglePasswordShowHide}/> : <RiEyeCloseLine onClick = {togglePasswordShowHide}/>}</IconContext.Provider>
                            <label htmlFor = "password">Password</label>
                            <input type = "password" className = "password" id = "password" name = "password" value = {registerInputs.password} onChange = {HandleInputChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition}/>
                            <p className = "err-message">{registerInputs.formErrors.password === "no error" ? "" : registerInputs.formErrors.password }</p>
                        </div>
                        <div className = "formGroup col-12 col-sm-6">
                            <label htmlFor = "confirm-password">Confirm Password</label>
                            <input type = "password" name = "confirmPassword" className = "confirm-password" id = "confirm-password" value = {registerInputs.confirmPassword} onChange = {HandleInputChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition}/>
                            <p className = "err-message">{registerInputs.formErrors.confirmPassword === "no error" ? "" : registerInputs.formErrors.confirmPassword }</p>
                        </div>
                    </div>
                    <button type = "submit" disabled = {disableBtn} className = "submit-btn" id = "register-btn">{disableBtn ? <IconContext.Provider value = {{className: "spin icon"}}><ImSpinner10 /></IconContext.Provider> : "SIGNUP"}</button>
                    <p className = "server-err-message" id = "server-err-msg">{serverErrMsg}</p>

                </form>
                <div className = "sign-up-using">
                    <p>or signup using</p>
                    <OauthComponent />
                </div>
                <Link to = "/signin" className = "already-a-member">already have an account? Login</Link>
            </div>
    )
}

export default RegistrationInitialComponent

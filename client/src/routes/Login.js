import {useState, useEffect, useContext} from "react";
import {UserContext} from "../context/UserContext";
import {IconContext} from "react-icons"
import { ImSpinner10 } from 'react-icons/im';
import OauthComponent from "../components/OauthComponent"
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import "../styles/login.scss";
import {Link, Redirect} from "react-router-dom"
import {HandleLabelPosition} from "../helper functions";
import axios from "axios";
import Loader from "../components/Loader"

const Login = () => {

    const {userData, loadUser} = useContext(UserContext)


    useEffect(() => {
        document.title = "Login - Nerdycruise"
    }, [])

    

    // states here
    const [loginInputs, setLoginInputs] = useState({
        usernameOrEmail: "",
        password: "",
        formErrors: {
            usernameOrEmail: "cannot be empty",
            password: "cannot be empty"
        }
    })
    const [requestErrMsg, setRequestErrMsg] = useState("")
    const [disableBtn, setDisableBtn] = useState(false)
    const spaceCharPattern = /\s/;
    const usernamePattern = /^[a-zA-Z0-9]+(?:[_-][a-zA-Z0-9]+)*$/;
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const HandleInputChange = ({target, target:{name, value}}) => {

        // if space, exit.
        if(spaceCharPattern.test(value)) return;

        target.previousSibling.classList.add("input-focus-label")
        target.nextElementSibling.classList.remove("err-message-show")

        switch (name) {

            case "usernameOrEmail":
                
                if(value.length === 0)
                    return setLoginInputs({...loginInputs, usernameOrEmail: value, formErrors:{...loginInputs.formErrors, usernameOrEmail: "cannot be empty"}})
                    
                    if(value.length  < 3 )
                    return setLoginInputs({...loginInputs, usernameOrEmail: value, formErrors:{...loginInputs.formErrors, usernameOrEmail: "username or email not valid"}})

                if(!usernamePattern.test(value) && !emailPattern.test(value))
                    return setLoginInputs({...loginInputs, usernameOrEmail: value, formErrors:{...loginInputs.formErrors, usernameOrEmail: "username or email not valid"}})
                    
                    
                setLoginInputs({...loginInputs, usernameOrEmail: value, formErrors:{...loginInputs.formErrors, usernameOrEmail: "no error"}})
                    
                break;
             case "password":

                if(value.length === 0)
                    return setLoginInputs({...loginInputs, password: value, formErrors:{...loginInputs.formErrors, password: "cannot be empty"}})

                if(value.length < 6)
                    return setLoginInputs({...loginInputs, password: value, formErrors:{...loginInputs.formErrors, password: "incorrect pasword"}})
                    
                setLoginInputs({...loginInputs, password: value, formErrors:{...loginInputs.formErrors, password: "no error"}})
                
                break;
             default :
                 break;
        }
     }

    const FormValid = ({usernameOrEmail, password}) => {
        let isValid = false;
        if(usernameOrEmail === "no error" && password === "no error")
            isValid = true;
        return isValid;
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if(FormValid(loginInputs.formErrors)) {
            setRequestErrMsg("");
            // disable submit button to prevent further click while current request is processing
            setDisableBtn(true)
            axios.post("/api/auth/login", {
                usernameOrEmail: loginInputs.usernameOrEmail,
                password: loginInputs.password
                
            }).then(res => {
                if(!res.data.status)
                    return setRequestErrMsg(res.data.message);

                    
                    localStorage.setItem("accessToken", res.data.token);
                    loadUser()
                    
            }).catch(err => {
                setRequestErrMsg("something went wrong");
            }).finally(() => {
                setDisableBtn(false)
            })
        } else {
            const usernameErrMsg = document.querySelector("#usernameOrEmail").nextElementSibling;
            const passwordErrMsg = document.querySelector("#password").nextElementSibling
            if(loginInputs.formErrors.usernameOrEmail !== "no error") {
                usernameErrMsg.innerText = loginInputs.formErrors.usernameOrEmail;
                usernameErrMsg.classList.add("err-message-show");
            }
            if(loginInputs.formErrors.password !== "no error") {
                passwordErrMsg.innerText = loginInputs.formErrors.password;
                passwordErrMsg.classList.add("err-message-show");
            }
        }

            
    }

    

    


    

    if(!("id" in userData)) return <Loader />;
    
    if (userData.id) return <Redirect to ='/dashboard' />;

    return (
        
        <div className = "login-page">
            <div className = "login-main-content">
                <h1 className = "header">LOGIN</h1>
                <form className = "login-form" onSubmit = {HandleSubmit}>
                    <div className = "formGroup">
                        <PersonOutlineIcon className = "input-icon" />
                        <label htmlFor = "usernameOrEmail">username or email</label>
                        <input type = "text" name = "usernameOrEmail" className = "usernameOrEmail" id = "usernameOrEmail" value = {loginInputs.usernameOrEmail} onChange={HandleInputChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition} />
                        <p className = "err-message"></p>
                    </div>
                    <div className = "formGroup">
                        <LockOpenIcon className = "input-icon" />
                        <label htmlFor = "password">password</label>
                        <input type = "password"  name = "password" className = "password" id = "password" value = {loginInputs.password} onChange={HandleInputChange} onFocus = {HandleLabelPosition} onBlur = {HandleLabelPosition} />
                        <p className = "err-message"></p>
                    </div>
                    <button type = "submit" className = "submit-btn" disabled = {disableBtn}>{disableBtn ? <IconContext.Provider value = {{className: "spin icon"}}><ImSpinner10 /></IconContext.Provider> : "SIGNIN"}</button>
                    <p className = "server-err-message" id = "server-err-msg">{requestErrMsg}</p>
                </form>
                <div className = "sign-in-using">
                    <p>or sign in using</p>
                    <OauthComponent />
                </div>
                
                <Link to = "/forgot-password" className = "forgot-password">forgot password?</Link>
                <Link to = "/signup" className = "not-a-member">not a member yet? Register</Link>
            </div>
        </div>
    )
}

export default Login

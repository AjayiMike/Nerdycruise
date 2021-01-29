import {useState, useEffect, useRef} from 'react'
import {useParams, useHistory} from "react-router-dom";
import axios from "axios";
import ResetPasswordFirstComponent from "../components/ResetPasswordFirstComponent";
import ResetPasswordSuccessComponent from "../components/ResetPasswordSuccessComponent";
import ResetPasswordExpiredLink from "../components/ResetPasswordExpiredLink";
import "../styles/resetPassword.scss";
import Loader from "../components/Loader"




const ResetPassword = () => {
    const {uidToken} = useParams();
    
    const [data, setData]  = useState({
        id: null,
        password: "",
        confirmPassword: "",
        formErrors: {
            password: "cannot be empty",
            confirmPassword: "cannot be empty",
        }
    });
    const [step, setStep] = useState(0)
    const [requestErr, setRequestErr] = useState("");
    const [serverResponse, setServerResponse] = useState("")
    const [disableBtn, setDisableBtn] = useState(false)
    const history = useHistory()
    const executedOnce = useRef(false)

    useEffect(() => {
        if(!executedOnce.current) {
            document.title = "password reset - Nerdycruise"
            axios.post("/api/auth/verify-reset-password-token", {idToken: uidToken})
                .then(res => {
                    if(!res.data.status)
                        return setStep(1);
    
                        
                        
                    setData({...data, id: res.data.message})
                    setStep(1)
    
                })
                .catch(err => {
                    setStep(1)
                })
            executedOnce.current = true;
        }   
    },[uidToken, data])


    const detectSpaceChar = /\s/;

    const HandleSetNewPasswordChange = ({target, target:{name, value}}) => {

        if(detectSpaceChar.test(value))
            return;
         

        switch (name) {
            case "password":
                target.previousSibling.classList.add("input-focus-label")
                target.nextElementSibling.classList.add("err-message-show")

                if(value.length === 0)
                    return setData({...data, password: value, formErrors:{...data.formErrors, password: "cannot be empty"}})

                if(value.length < 6)
                    return setData({...data, password: value, formErrors:{...data.formErrors, password: "must be at least 6 characters long"}})
                    
                if(data.confirmPassword.length === 0) {
                    setData({...data, password: value, formErrors:{...data.formErrors, password: "no error"}})
                    target.nextElementSibling.classList.remove("err-message-show")
                }

            
                if(data.confirmPassword.length !== 0 && data.confirmPassword !== value) {
                    setData({...data, password: value, formErrors:{...data.formErrors, password: "no error", confirmPassword: "passwords not match"}})
                    document.querySelector("#confirm-password").nextElementSibling.classList.add("err-message-show")
                }

                if(value === data.confirmPassword) {
                    setData({...data, password: value, formErrors:{...data.formErrors, password: "no error", confirmPassword: "no error"}})
                    target.nextElementSibling.classList.remove("err-message-show")
                    document.querySelector("#confirm-password").nextElementSibling.classList.remove("err-message-show")
                }
                break;
            case "confirmPassword" :
                target.previousSibling.classList.add("input-focus-label")
                target.nextElementSibling.classList.add("err-message-show")
                if(value.length > 0) {
                    if(value === data.password) {
                        setData({...data, confirmPassword: value, formErrors:{...data.formErrors, confirmPassword: "no error"}})
                        target.nextElementSibling.classList.remove("err-message-show")
                    } else {
                        setData({...data, confirmPassword: value, formErrors:{...data.formErrors, confirmPassword: "passwords not match"}})
                    }
                    
                } else {
                    setData({...data, confirmPassword: value, formErrors:{...data.formErrors, confirmPassword: "cannot be empty"}})
                }
                break;
            default:
                break;
        }
    
    
    }
    
    const HandleNewPasswordSubmit = (e) => {
       e.preventDefault();
       if(data.formErrors.password === "no error" && data.formErrors.confirmPassword === "no error") {
           setRequestErr("")
           setDisableBtn(true)
           axios.put("/api/auth/reset-password", {
               id: data.id,
               password: data.password
           })
           .then(res => {
               setDisableBtn(false)

               if(!res.data.status)
                return setRequestErr(res.data.message)

                

                setServerResponse(res.data.message)
                setStep(2)
           }).catch(err => {
               setDisableBtn(false)
                setRequestErr("something went wrong")
           })
       } else {
        let passwordErrMsg = document.querySelector("#password").nextElementSibling;
        let confirmPasswordErrMsg = document.querySelector("#confirm-password").nextElementSibling
        if(data.formErrors.password !== "no error") {
            passwordErrMsg.classList.add("err-message-show");
        }
        if(data.formErrors.confirmPassword !== "no error") {
            confirmPasswordErrMsg.classList.add("err-message-show");
        }
       }
    }



    const GotoLoginPage = () => {
        history.push("/signin")
    }
    
    const GotoForgotPasswordPage = () => {
        history.push("/forgot-password")
    }

    return (
        <div className = "reset-password-page">
            {step === 0? <Loader /> : null}
            {step === 1 ? data.id ? <ResetPasswordFirstComponent onChange = {HandleSetNewPasswordChange} disableBtn = {disableBtn} data = {data} handleSubmit = {HandleNewPasswordSubmit} requestErr = {requestErr}/> : <ResetPasswordExpiredLink GotoForgotPasswordPage = {GotoForgotPasswordPage} /> : null}
            {step === 2 ? serverResponse === "success" ? <ResetPasswordSuccessComponent GotoLoginPage = {GotoLoginPage} /> : <ResetPasswordExpiredLink GotoForgotPasswordPage = {GotoForgotPasswordPage} /> : null}
        </div>
    )
}

export default ResetPassword

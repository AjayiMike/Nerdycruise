import {useState, useEffect, useContext} from 'react'
import "../styles/forgotPassword.scss";
import ForgotPasswordFirstComponent from "../components/ForgotPasswordFirstComponent"
import ForgotPasswordSuccessComponent from "../components/ForgotPasswordSuccessComponent"
import axios from "axios"
import {UserContext} from "../context/UserContext";
import Loader from "../components/Loader"
import {Redirect} from "react-router-dom"

const ForgotPassword = () => {

    const {userData} = useContext(UserContext)

    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [errMsg, setErrMsg] = useState("no error")
    const [requestErrMsg, setRequestErrMsg] = useState(null)
    const [serverResponse, setServerResponse] = useState(null)
    const [step, setStep] = useState(1)
    const [disableBtn, setDisableBtn] = useState(false)

    useEffect(() => {
        document.title = "Forgot password - Nerdycruise"
    }, [])

    const detectSpaceChar = /\s/;

    const HandleInputChange = ({target, target:{value}}) => {

        if(detectSpaceChar.test(value))
            return;

        target.previousSibling.classList.add("input-focus-label")
        target.nextElementSibling.classList.remove("err-message-show")
        
        setUsernameOrEmail(value)
    
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if(usernameOrEmail.length < 1) {
            setErrMsg("cannot be empty");
            document.querySelector(".err-message").classList.add("err-message-show");
            return;
        }

        if(usernameOrEmail.length < 3) {
            setErrMsg("invalid username or email address");
            document.querySelector(".err-message").classList.add("err-message-show");
            return;
        }
            setDisableBtn(true)
            // remove the previous error message if any
            setRequestErrMsg(null)
            axios.post("/api/auth/forgot-password", {usernameOrEmail})
            .then(res => {

                if(!res.data.status)
                    return setRequestErrMsg(res.data.message)

                setServerResponse(res.data.message)
                setStep(2)
            })
            .catch(err => {
                
                setRequestErrMsg("something went wrong, please try again later")
            })
            .finally(() => {
                setDisableBtn(false)
            })
    }

    

    if(!("id" in userData)) return <Loader />;
    
    if (userData.id) return <Redirect to ='/dashboard' />;
            

    return (
        <div className = "forgot-password-page">
            {step === 1 ? <ForgotPasswordFirstComponent usernameOrEmail = {usernameOrEmail} disableBtn = {disableBtn} errMsg = {errMsg} requestErrMsg = {requestErrMsg} HandleInputChange = {HandleInputChange} HandleSubmit = {HandleSubmit}/> : 
            <ForgotPasswordSuccessComponent serverResponse = {serverResponse} />}
        </div>
    )
}

export default ForgotPassword
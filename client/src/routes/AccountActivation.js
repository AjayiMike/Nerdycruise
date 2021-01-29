import {useState, useEffect, useRef} from "react";
import {useParams, useHistory} from "react-router-dom";
import jwt from "jsonwebtoken";
import Loader from "../components/Loader"
import AccountActivationFirstComponent from "../components/AccountActivationFirstComponent";
import AccountActivationExpiredLink from "../components/AccountActivationExpiredLink";
import AccountActivationSuccessComponent from "../components/AccountActivationSuccessComponent";
import axios from "axios";
import "../styles/accountActivation.scss"


const AccountActivation = () => {
    const {usernameToken, userDetailsToken} = useParams()
    const [step, setStep] = useState(0)
    const [tokenState, setTokenState] = useState("invalid")
    const [userDetails, setUserDetails] = useState({
        name: "",
        token: ""
    })
    const [serverResponse, setServerResponse] = useState("")
    const [disableBtn, setDisableBtn] = useState(false)
    const history = useHistory()
    const effectExecuted = useRef(false)

    useEffect(() => {
        if(!effectExecuted.current) {
            document.title = "Account activation - Nerdycruise"
            jwt.verify(usernameToken, process.env.REACT_APP_USERNAME_SECRET, (err, res) => {
                if(err)
                    return setStep(1);
                 
                setTokenState("valid")
                setUserDetails({...userDetails, name: res.username, token: userDetailsToken })
                setStep(1)
            })
            
            effectExecuted.current = true;
        }
    }, [usernameToken, userDetails, userDetailsToken])

    const ActivateAcc = () => {
        setDisableBtn(true)
        axios.post("/api/auth/account-activation", {token: userDetails.token})
        .then(res => {
            if(!res.data.status) {
                setStep(2)
                setServerResponse(res.data.message);
                return;
            }
            setServerResponse(res.data.message);
            setStep(2)
        }).catch(err => {
    
            setStep(2)
            setServerResponse("something went wrong");
        })
        .finally(() => {
            setDisableBtn(false)
        })

    }

    const GotoRegisterPage = () => {
        history.push("/signup")
    }

    const GotoLoginPage = () => {
        history.push("/signin")
    }

    return (
        <div className = "account-activation-page">
            {step === 0 ? <Loader /> : null}
            {step === 1 ? tokenState === "valid" ? <AccountActivationFirstComponent ActivateAcc = {ActivateAcc} disableBtn = {disableBtn} name = {userDetails.name} /> : <AccountActivationExpiredLink GotoRegisterPage = {GotoRegisterPage} /> : null}
            {step === 2 ? serverResponse === "success" ? <AccountActivationSuccessComponent GotoLoginPage = {GotoLoginPage} name = {userDetails.name} /> : <AccountActivationExpiredLink GotoRegisterPage = {GotoRegisterPage} /> : null}
        </div>
    )
}

export default AccountActivation

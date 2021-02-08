import {useState, useEffect, useContext} from "react";
import {Redirect} from "react-router-dom"
import RegistrationInitialComponent from "../components/RegistrationInitialComponent";
import RegisterSuccessComponent from "../components/RegistrationSuccessComponent";
import {checkUsernameExistence} from "../helper functions";
import {UserContext} from "../context/UserContext";
import axios from "axios"
import Loader from "../components/Loader";


const Register = () => {

    const {userData} = useContext(UserContext)
    

    useEffect(() => {
        document.title = "Register - Nerdycruise"
    }, [])
    const [step, setStep] = useState(1);
    const [registerInputs, setRegisterInputs] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        formErrors: {
            email: "cannot be empty",
            username: "cannot be empty",
            password: "cannot be empty",
            confirmPassword: "cannot be empty",
        }
    });
    // this holds the error message sent by the server
    const [serverErrMsg, setServerErrMsg] = useState("");
    const [disableBtn, setDisableBtn] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const spaceCharPattern = /\s/;
    const usernamePattern = /^[a-zA-Z0-9]+(?:[_-][a-zA-Z0-9]+)*$/;


    const HandleInputChange = (e) => {
        const {target, target:{name, value}} = e

        // if space, exit.
        if(spaceCharPattern.test(value)) 
            return;

        /*the line immediately after this comment ensures the label goes up even if the field is being auto filled
        while the one after it ensures the error message for the field, if any, is shown */
        target.previousSibling.classList.add("input-focus-label")
        target.nextElementSibling.classList.add("err-message-show")

        switch (name) {
            case "email" :

                if(value.length ===  0)
                    return setRegisterInputs({...registerInputs, email: value, formErrors:{...registerInputs.formErrors, email: "cannot be empty"}})
                
                
                if(!emailPattern.test(value))
                   return setRegisterInputs({...registerInputs, email: value, formErrors:{...registerInputs.formErrors, email: "invalid email address"}})
                    
                setRegisterInputs({...registerInputs, email: value, formErrors:{...registerInputs.formErrors, email: "no error"}})
                target.nextElementSibling.classList.remove("err-message-show")
                     
                break;

            case "username" :

                if(value.length === 0)
                    return setRegisterInputs({...registerInputs, username: value, formErrors:{...registerInputs.formErrors, username: "cannot be empty"}})

                if(value.length < 3)
                    return setRegisterInputs({...registerInputs, username: value, formErrors:{...registerInputs.formErrors, username: "must be at least 3 characters long"}})
                
                if(!usernamePattern.test(value))
                return setRegisterInputs({...registerInputs, username: value, formErrors:{...registerInputs.formErrors, username: "invalid username"}})
                

                checkUsernameExistence(value)
                    .then(res => {
                        if(!res.data.status)
                            return setRegisterInputs({...registerInputs, username: value, formErrors:{...registerInputs.formErrors, username: res.data.message}})

                        setRegisterInputs({...registerInputs, username: value, formErrors:{...registerInputs.formErrors, username: "no error"}})
                        target.nextElementSibling.classList.remove("err-message-show")
                          
                        
                    }).catch(err => {
                        console.log(err)
                    })
                      
                break;
            
            case "password" :

                if(value.length === 0)
                    return setRegisterInputs({...registerInputs, password: value, formErrors:{...registerInputs.formErrors, password: "cannot be empty"}})

                if(value.length < 6)
                    return setRegisterInputs({...registerInputs, password: value, formErrors:{...registerInputs.formErrors, password: "must be at least 6 characters long"}})


                if(registerInputs.confirmPassword.length === 0) {
                    setRegisterInputs({...registerInputs, password: value, formErrors:{...registerInputs.formErrors, password: "no error"}})
                    target.nextElementSibling.classList.remove("err-message-show")
                    return
                }
                
                if(registerInputs.confirmPassword !== value) {
                    setRegisterInputs({...registerInputs, password: value, formErrors:{...registerInputs.formErrors, password: "no error", confirmPassword: "passwords not match"}})
                    document.querySelector("#confirm-password").nextElementSibling.classList.add("err-message-show")
                    return
                }

                if(value === registerInputs.confirmPassword) {
                    setRegisterInputs({...registerInputs, password: value, formErrors:{...registerInputs.formErrors, password: "no error", confirmPassword: "no error"}})
                    target.nextElementSibling.classList.remove("err-message-show")
                    document.querySelector("#confirm-password").nextElementSibling.classList.remove("err-message-show")
                    return
                }
                
                    
                break;
            case "confirmPassword" :

                if(value.length === 0)
                    return setRegisterInputs({...registerInputs, confirmPassword: value, formErrors:{...registerInputs.formErrors, confirmPassword: "cannot be empty"}})

                if(value !== registerInputs.password)
                    return setRegisterInputs({...registerInputs, confirmPassword: value, formErrors:{...registerInputs.formErrors, confirmPassword: "passwords not match"}})


                setRegisterInputs({...registerInputs, confirmPassword: value, formErrors:{...registerInputs.formErrors, confirmPassword: "no error"}})
                target.nextElementSibling.classList.remove("err-message-show")
                     
                break;
            default:
                break;

        }
    }

    const FormValid = ({email, username, password, confirmPassword}) => {
        let isValid = false;
            if(username === "no error" && password === "no error" && confirmPassword === "no error" && email === "no error") {
                isValid = true;
            }
        return isValid;
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if(!FormValid(registerInputs.formErrors))
            return;

        setDisableBtn(true)
        setServerErrMsg("")
        axios.post("/api/auth/register", {
            email: registerInputs.email,
            username: registerInputs.username,
            password: registerInputs.password
        }).then(res => {
                setDisableBtn(false)
            if(res.data.status) {
                setStep(2)
            } else {
                setServerErrMsg(res.data.message);
            }
        }).catch(err => {
            setDisableBtn(false)
            setServerErrMsg("something went wrong!");
        })
            
        
    }


    const togglePasswordShowHide = () => {
        const confirmPassword = document.querySelector("#confirm-password")
        const password = document.querySelector("#password")

        if(showPassword) {
            confirmPassword.type = "password"
            password.type = "password"
        } else {
            confirmPassword.type = "text"
            password.type = "text"
        }

        setShowPassword(prev => !prev)

    }

    if(!("id" in userData)) return <Loader />;

    if (userData.id) return <Redirect to ='/dashboard' />;

    return (
        <div className = "register-page">
            {step === 1 ?
                <RegistrationInitialComponent
                showPassword = {showPassword}
                togglePasswordShowHide = {togglePasswordShowHide}
                disableBtn = {disableBtn}
                HandleSubmit = {HandleSubmit}
                HandleInputChange = {HandleInputChange}
                registerInputs = {registerInputs}
                serverErrMsg = {serverErrMsg} /> : null 
            }

            {step === 2 ?
                <RegisterSuccessComponent /> : null
            }
        </div>
    )
}

export default Register

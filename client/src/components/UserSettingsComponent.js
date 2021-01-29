import {useState} from "react"
import ArrowBack from '@material-ui/icons/ArrowBack';
import {FiCamera} from "react-icons/fi"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {IconContext} from "react-icons"

const UserSettingsComponent = ({userData, CloseSettings}) => {

    const [newEmail, setNewEmail] = useState({
        value: "",
        error: null
    })
    const [newUsername, setNewUsername] = useState({
        value: "",
        error: null
    })
    const [newPassword, setNewPassword] = useState({
        value: "",
        error: null
    })

    const newEmailChange = (e) => {
        
        setNewEmail({...newEmail, value: e.target.value})
    }
    const newUsernameChange = (e) => {
        setNewUsername({...newUsername, value: e.target.value})
    }
    const newPasswordChange = (e) => {
        setNewPassword({...newPassword, value: e.target.value})
    }

    const toggleExpandCollapseCard = (e) => {
        const clickTargetCard = e.currentTarget.parentNode;
        const allCards = document.querySelectorAll(".card");
        if (clickTargetCard.classList.contains("card-expand")) {
            clickTargetCard.classList.remove("card-expand")
            e.currentTarget.classList.remove("arrow-icon-rotate")
        } else {
            clickTargetCard.classList.add("card-expand")
            e.currentTarget.classList.add("arrow-icon-rotate")
        }
        
        allCards.forEach(card => {
            if(card !== clickTargetCard && card.classList.contains("card-expand")) {
                card.classList.remove("card-expand")
                card.childNodes[1].classList.remove("arrow-icon-rotate")

            }
        })

    }
    return (
        <div className = "user-settings">
            <div className = "sticky-top">
                <ArrowBack className = "arrow-back" onClick = {CloseSettings} />
            </div>
            
            <div className = "heading">
                <h1>account settings</h1>
                <p>edit and manage your account details</p>
            </div>
            <div className = "settings-main">
                <div className = "profile-pic-container">
                    <div className = "div-img">
                        <div>
                            <img src = {userData.avatar_url} alt = "profile" />
                            <span className = "hover-overlay">
                                <IconContext.Provider value = {{className: "camera-icon"}}><FiCamera/></IconContext.Provider>
                            </span>
                        </div>
                    </div>
                    <button className = "gen-btn change-picture-btn">change picture <IconContext.Provider value = {{className: "camera-icon"}}><FiCamera/></IconContext.Provider></button>
                </div>
                <div className = "card-container">
                <div className = "card">
                    <h1 className = "card-title">Change Email</h1>
                    <ArrowForwardIosIcon className = "arrow-icon" onClick = {toggleExpandCollapseCard} />
                    <div className = "card-body">
                    <p className = "current">current: {userData.email}</p>
                        <input type = "email" className = "input-field" placeholder = "enter your new email" value = {newEmail.value} onChange = {newEmailChange} />
                        <button className = "gen-btn submit-btn">Submit</button>
                    </div>
                </div>
                <div className = "card">
                    <h1 className = "card-title">Change Username</h1>
                    <ArrowForwardIosIcon className = "arrow-icon" onClick = {toggleExpandCollapseCard} />
                    <div className = "card-body">
                        <p className = "current">current: {userData.username}</p>
                        <input type = "text" className = "input-field" placeholder = "pick a new username" value = {newUsername.value} onChange = {newUsernameChange} />
                        <button className = "gen-btn submit-btn">Submit</button>
                    </div>
                </div>
                <div className = "card">
                    <h1 className = "card-title">Change Password</h1>
                    <ArrowForwardIosIcon className = "arrow-icon" onClick = {toggleExpandCollapseCard} />
                    <div className = "card-body">
                        <input type = "password" className = "input-field" placeholder = "enter your new password" value = {newPassword.value} onChange = {newPasswordChange} />
                        <button className = "gen-btn submit-btn">Submit</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default UserSettingsComponent

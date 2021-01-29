import {useState} from "react"
import DashboardComponent from "./DashboardComponent"
import UserSettingsComponent from "./UserSettingsComponent"

const Dashboard = ({userData}) => {

    const [view, setView] = useState("dashboard")

    const toggleSettings = () => {
        view === "settings" ? setView("dashboard") : setView("settings")
        
    }



    return (
        <div className = "page">
            {view === "dashboard" ? 
                <DashboardComponent userData = {userData} OpenSettings = {toggleSettings} /> : null
            }

            {view === "settings" ? 
                <UserSettingsComponent CloseSettings = {toggleSettings} userData = {userData} /> : null
            }
        </div>
    )
}

export default Dashboard

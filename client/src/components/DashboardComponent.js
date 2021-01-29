import { FcLineChart } from "react-icons/fc";
import { FcSurvey } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import { FiActivity } from "react-icons/fi";
import {IconContext} from "react-icons"
import SettingsIcon from '@material-ui/icons/Settings';

const DashboardComponent = ({userData, OpenSettings}) => {

    const {username, avatar_url} = userData;
    return (
        <div className = "dashboard">
            <div className = "top-presentational-container">
                <div>
                    <SettingsIcon className = "settings-icon" onClick = {OpenSettings} />
                </div>
            </div>
            <div className = "personal-info">
                <div className = "profile-pic-container">
                    <div>
                        <div>
                            <img src = {avatar_url} alt = "profile avatar" />
                        </div>
                    </div>
                </div>
                <h3>{`@${username}`}</h3>
            </div>
            <div className = "sections">
                <h3 className = "section-title">activities log</h3>
                <div className = "activities">
                    <div className = "activity test-taken"><IconContext.Provider value = {{className: "activity-icon"}}><FcSurvey /></IconContext.Provider><span>23<br />test taken</span></div>
                    <div className = "activity average performance"><IconContext.Provider value = {{className: "activity-icon"}}><FcLineChart /></IconContext.Provider><span>65%<br />performance</span></div>
                    <div className = "activity question-asked"><IconContext.Provider value = {{className: "activity-icon"}}><FcQuestions /></IconContext.Provider><span>13 questions asked</span></div>
                    <div className = "activity question-answered"><IconContext.Provider value = {{className: "activity-icon"}}><FiActivity /></IconContext.Provider><span>43 answers provided</span></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent

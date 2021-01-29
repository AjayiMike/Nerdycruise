
import React, {useEffect, useContext} from 'react';
import {Link, Redirect} from "react-router-dom"
import {UserContext} from "../context/UserContext"
import "../styles/home.scss";
import education from "../images/education.svg";
import discussion from "../images/discussion.svg";
import test from "../images/test.svg";
import publishPost from "../images/publish post.svg";
import celebration from "../images/celebration.svg";
import AOS from "aos";
import "aos/dist/aos.css"
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';




const Home = () => {

    const {userData} = useContext(UserContext)
    
    useEffect(() => {
        document.title = "Nerdycruise";
        AOS.init();
        AOS.refresh();
    }, [])


    if (userData.id) return <Redirect to ='/dashboard' />;


    return (
        <>
            <div className = "container home-page">
                <section className = "section">
                    <div className = "image-container">
                        <img src = {education} className = "section-image" alt = "a student reading online" />
                    </div>
                    <div className = "text-container">
                        <h1>START LEARNING SMARTLY TODAY, LEARN WHILE YOU HAVE FUN</h1>
                        <Link to = "/signup" className = "gen-btn section-btn">GET STARTED <ArrowRightAltIcon className = "icon" /></Link>
                    </div>
                </section>

                <section className = "section" data-aos="slide-right" data-aos-easing="ease-in-sine" data-aos-duration = "300" data-aos-offset = "100">
                    <div className = "image-container">
                        <img src = {discussion} className = "section-image" alt = "students discusing online" />
                    </div>
                    <div className = "text-container">
                        <p>learning does not have to be boring. get exited learnig with other studens just like you from all part of the country</p>
                    </div>
                </section>

                <section className = "section" data-aos="slide-left" data-aos-easing="ease-in-sine" data-aos-duration = "300" data-aos-offset = "100">
                    <div className = "image-container">
                        <img src = {test} className = "section-image" alt = "students taking test" />
                    </div>
                    <div className = "text-container">
                        <p>take WAEC JAMB and POST UTME simulated exams on this platform before you actually sit for them. that way, you will be able know how prepared you are for your exams</p>
                    </div>
                </section>

                <section className = "section" data-aos ="slide-up" data-aos-easing="ease-in-sine" data-aos-duration = "300" data-aos-offset = "100">
                    <div className = "image-container">
                        <img src = {publishPost} className = "section-image" alt = "students posting question online" />
                    </div>
                    <div className = "text-container">
                        <p>have any question? you can post them in the discussion forum and get them answered by other students</p>
                    </div>
                </section>

                <section className = "section" data-aos ="fade-up-left" data-aos-easing="ease-in-sine" data-aos-duration = "300" data-aos-offset = "100">
                    <div className = "image-container">
                        <img src = {celebration} className = "section-image" alt = "an excited girl" />
                    </div>
                    <div className = "text-container">
                        <p>sounds great right? all you have to do is</p>
                        <Link to = "/signup" className = "gen-btn section-btn">START NOW <ArrowRightAltIcon className = "icon" /></Link>
                    </div>
                </section>
            </div>
        </>
    );
}
export default Home;
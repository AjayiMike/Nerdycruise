import React, {useEffect, useContext} from 'react';
import {Redirect} from "react-router-dom"
import {UserContext} from "../context/UserContext"
import "../styles/dashboard.scss"
import Dashboard from "../components/Dashboard"

const DashboardContainer = () => {

    const {userData} = useContext(UserContext)

    useEffect(() => {
        document.title = "Dashboard - Nerdycruise"
    }, [])

    if (!userData.id) return <Redirect to ='/' />;


    return (
        <Dashboard userData = {userData} />
    )
}

export default DashboardContainer

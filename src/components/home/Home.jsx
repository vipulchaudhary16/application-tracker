import React from "react";
import AddApplication from "../Add Application/AddApplication";
import ApplicationList from "../Applications/ApplicationList";
import Welcome from "../Welcome";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./home.css";

const Home = () => {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const [showForm, setShowForm] = React.useState(false);

    const toggleFrom = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            {
                !isLoggedIn ? (
                    <Welcome />
                ) : (
                    <div className="home-div">
                        <AiOutlinePlusSquare className="add-icon" onClick={() => toggleFrom()} />
                        {showForm && <AddApplication />}
                        <ApplicationList />
                    </div>
                )
            }
        </>
    );
};

export default Home;

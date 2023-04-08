import React from "react";
import AddApplication from "../Add Application/AddApplication";
import ApplicationList from "../Applications/ApplicationList";
import Welcome from "../Welcome";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./Home.css";

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
                        <div className="icon-container" onClick={() => toggleFrom()}>
                            <AiOutlinePlusSquare className="add-icon" title="click here to add new job" />
                            <span>Click here to add </span>
                        </div>
                        {showForm && <AddApplication />}
                        <ApplicationList />
                    </div>
                )
            }
        </>
    );
};

export default Home;

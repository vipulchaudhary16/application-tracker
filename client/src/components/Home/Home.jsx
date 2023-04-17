import React from "react";
import AddApplication from "../Add Application/AddApplication";
import ApplicationList from "../Applications/ApplicationList";
import Welcome from "../Welcome";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./Home.css";
import { useContext } from "react";
import { UIContext } from "../../context/ui.controler.context";

const Home = () => {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const { formDisplay, toggleForm } = useContext(UIContext);

    return (
        <>
            {
                !isLoggedIn ? (
                    <Welcome />
                ) : (
                    <div className="home-div">
                        <div className="icon-container" onClick={() => toggleForm()}>
                            <AiOutlinePlusSquare className="add-icon" title="click here to add new job" />
                            <span>Click here to add </span>
                        </div>
                        {formDisplay && <AddApplication />}
                        <ApplicationList />
                    </div>
                )
            }
        </>
    );
};

export default Home;

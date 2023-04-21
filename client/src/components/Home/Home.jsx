import React from "react";
import AddApplication from "../Add Application/AddApplication";
import ApplicationList from "../Applications/ApplicationList";
import Welcome from "../Welcome";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./Home.css";
import { useContext } from "react";
import { MODAL_TYPES, UIContext } from "../../context/ui.controler.context";
import { PopUpModel } from "../PopUpModel";
import UpdateApplication from "../Update Application/UpdateApplication";
import { ApplicationProvider } from "../../context/applications.context";

const Home = () => {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const { activeModel } = useContext(UIContext);
    return (
        <ApplicationProvider>
            {
                !isLoggedIn ? (
                    <Welcome />
                ) : (
                    <div className="home-div">
                        {activeModel == MODAL_TYPES.ADD && <PopUpModel > <AddApplication /></PopUpModel>}
                        {activeModel == MODAL_TYPES.UPDATE && <PopUpModel > <UpdateApplication /></PopUpModel>}
                        <ApplicationList />
                    </div>
                )
            }
        </ApplicationProvider>
    );
};

export default Home;

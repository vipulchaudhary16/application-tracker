import React from "react";
import ApplicationList from "../applications/ApplicationList";
import Welcome from "../Welcome";
import "./Home.css";
import { useContext } from "react";
import { MODAL_TYPES, UIContext } from "../../context/ui.controler.context";
import { PopUpModel } from "../PopUpModel";
import { ApplicationContext } from "../../context/applications.context";
import AddApplication from "../add application/AddApplication";

const Home = () => {
	const isLoggedIn = localStorage.getItem('token') ? true : false;
	const { activeModel } = useContext(UIContext);
	const { updatingApplication } = useContext(ApplicationContext)

	return (
		<>
			{
				!isLoggedIn ? (
					<Welcome />
				) : (
					<div className="home-div">
						<ApplicationList />
						{activeModel === MODAL_TYPES.Application_form && <PopUpModel > <AddApplication updatingApplication={updatingApplication} /></PopUpModel>}
					</div>
				)
			}
		</>
	);
};

export default Home;

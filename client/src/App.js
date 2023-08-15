import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Home from "./components/home/Home";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import './App.css';
import { Alert } from "./components/Alert";
import { useContext } from "react";
import { AlertContext } from "./context/alert.context";
import LoadingBar from "react-top-loading-bar";
import { UIContext } from "./context/ui.controler.context";
import { Loader } from "./components/Loader";
import { Profile } from "./components/profile/Profile";

function App() {
  const { alertMessage } = useContext(AlertContext)
  const { progress, setProgress, isLoading } = useContext(UIContext)
  return (
    <div className="App">
      {alertMessage && <Alert />}
      {isLoading && <Loader/>}
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color="#f11946"
          height={10}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/me' element={<Profile />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

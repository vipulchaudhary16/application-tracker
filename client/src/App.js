import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import './App.css';
import { Alert } from "./components/Alert";
import { useContext } from "react";
import { AlertContext } from "./context/alert.context";
import LoadingBar from "react-top-loading-bar";
import { UIContext } from "./context/ui.controler.context";

function App() {
  const { alertMessage } = useContext(AlertContext)
  const { progress, setProgress } = useContext(UIContext)
  return (
    <div className="App">
      {alertMessage && <Alert />}
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
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

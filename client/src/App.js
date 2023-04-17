import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import './App.css';
import { Alert } from "./components/Alert";
import { useContext } from "react";
import { AlertContext } from "./context/alert.context";

function App() {
  const { alertMessage } = useContext(AlertContext)
  return (
    <div className="App">
      {alertMessage && <Alert />}
      <BrowserRouter>
      <Navbar />
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

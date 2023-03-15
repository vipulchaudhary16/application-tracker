import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from './components/LogIn/LogIn';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import Home from "./components/Home/Home";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
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

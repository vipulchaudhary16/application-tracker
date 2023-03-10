import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home/>}/>          
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

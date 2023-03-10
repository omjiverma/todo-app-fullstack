import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Hero />} />
        <Route path='/signup' element={<SignUp />} />
        <Route  path='/signin' element={<SignIn />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Inicio } from "./Inicio";
import Menu from "../src/components/Menu/index"
import Habitat from "../src/components/habitat/index"
import Login from '../src/components/Sesion/index'
import Registro from '../src/components/habitat/registro'
import Sesion from '../src/components/Sesion/registro'
import HabitatDetails from './components/habitat/habitatDetails'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Inicio />} /> */}
          <Route path="/" element={<Inicio/>}/>
          <Route path="/menu" element={<Menu />} />
          <Route path="/habitat" element={<Habitat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newHabitat" element={<Registro/>} />
          <Route path="/registro" element={<Sesion/>}/>
          <Route path="/habitat/:id" element={<HabitatDetails />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;

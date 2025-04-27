import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/context";

/* Layout */
import NavBar from "./components/layout/NavBar";

/* Pages */
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Evento from "./components/layout/Evento/Evento";
import Perfil from "./components/layout/Perfil/Perfil";
import MyEventos from "./components/layout/MyEventos/MyEventos";
import CriarEventos from "./components/layout/CriarEventos/CriarEventos";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Evento" element={<Evento />} />
          <Route path="/MyEventos" element={<MyEventos />} />
          <Route path="/CriarEventos" element={<CriarEventos />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

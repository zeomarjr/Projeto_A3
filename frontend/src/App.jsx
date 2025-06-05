import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/context";

/* Layout */
import NavBar from "./components/layout/NavBar";

/* Pages */
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Perfil from "./components/layout/Perfil/Perfil";
import MyEventos from "./components/layout/MyEventos/MyEventos";
import CriarEventos from "./components/layout/CriarEventos/CriarEventos";
import Footer from "./components/layout/footer/footer";
import EventDetails from "./components/layout/PageEventos/EventDetails";
import EditarEventos from "./components/layout/EditEvento/EditEvento";
import MeusIngressos from "./components/layout/MeusIngressos/MeusIngressos";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <NavBar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Perfil" element={<Perfil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/MyEventos" element={<MyEventos />} />
              <Route path="/CriarEventos" element={<CriarEventos />} />
              <Route path="/edit/:id" element={<EditarEventos />} />
              <Route path="/detalis/:id" element={<EventDetails />} />
              <Route path="/MeusIngressos" element={<MeusIngressos />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}


export default App;

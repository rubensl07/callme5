import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Notas from "./pages/Notas.jsx";
import ChatScreen from "./pages/Chat.jsx";
import AjudaScreen from "./pages/Autoajuda.jsx";
import Estatistica from "./pages/Estatistica.jsx"; 
import Doacao from "./pages/Doacao.jsx"; 
import PasswordRecovery1 from "./pages/PasswordRecoveryMailSend.jsx"; 
import PasswordRecovery2 from "./pages/PasswordRecoveryNewPass.jsx"; 
import Profile from "./pages/Profile.jsx";
import Menu from "./pages/Menu.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/ajuda" element={<AjudaScreen />} />
        <Route path="/estatistica" element={<Estatistica />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route path="/passwordrecovery1" element={<PasswordRecovery1 />} />
        <Route path="/passwordrecovery2" element={<PasswordRecovery2 />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;

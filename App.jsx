import React, { useContext } from "react";
import { AuthContext } from './Contexts/AuthContext';
import '/src/css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";  
import Login from '/src/pages/Login.jsx';
import Cadastro from '/src/pages/Cadastro.jsx';
import Notas from '/src/pages/Notas.jsx';
import ChatScreen from '/src/pages/Chat.jsx';
import AjudaScreen from '/src/pages/Autoajuda.jsx';
import Estatistica from '/src/pages/Estatistica.jsx'; 
import Doacao from '/src/pages/Doacao.jsx'; 
import PasswordRecovery1 from '/src/pages/PasswordRecoveryMailSend.jsx'; 
import PasswordRecovery2 from '/src/pages/PasswordRecoveryNewPass.jsx'; 
import Profile from '/src/pages/Profile.jsx';
import Menu from '/src/pages/Menu.jsx';
import DefaultPage from '/src/pages/DefaultPage.jsx';  

export default () => {
  const { auth } = useContext(AuthContext);  

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/passwordRecoveryMailSend" element={<PasswordRecovery1 />} />
        <Route path="/passwordRecoveryNewPass" element={<PasswordRecovery2 />} />

        {/* Private Routes (Authenticated Users Only) */}
        <Route path="/menu" element={auth.isAuthenticated ? <Menu /> : <Navigate to="/" />} />
        <Route path="/notas" element={auth.isAuthenticated ? <Notas /> : <Navigate to="/" />} />
        <Route path="/chat" element={auth.isAuthenticated ? <ChatScreen /> : <Navigate to="/" />} />
        <Route path="/ajuda" element={auth.isAuthenticated ? <AjudaScreen /> : <Navigate to="/" />} />
        <Route path="/estatistica" element={auth.isAuthenticated ? <Estatistica /> : <Navigate to="/" />} />
        <Route path="/doacao" element={auth.isAuthenticated ? <Doacao /> : <Navigate to="/" />} />
        <Route path="/perfil" element={auth.isAuthenticated ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

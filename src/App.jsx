import React, { useState } from "react";
import './css/App.css';
import LoginScreen from "./pages/LoginScreen.jsx";
import RegisterScreen from "./pages/Cadastro.jsx";
import MenuScreen from "./pages/MenuScreen.jsx";
import ChatScreen from "./pages/ChatScreen.jsx";
import AjudaScreen from "./pages/AjudaScreen.jsx";
import Estatistica from "./pages/Estatistica.jsx"; 
import Doacao from "./pages/Doacao.jsx"; 

const App = () => {
  const [screen, setScreen] = useState("login");

  const navigateToRegister = () => setScreen("register");
  const navigateToLogin = () => setScreen("login");
  const handleLogin = () => setScreen("menu");
  const navigateToChat = () => setScreen("chat");
  const navigateToAjuda = () => setScreen("ajuda"); 
  const navigateToEstatistica = () => setScreen("estatistica"); 
  const navigateToDoacao = () => setScreen("doacao");

  return (
    <div>
      {screen === "login" && (
        <LoginScreen
          navigateToRegister={navigateToRegister}
          handleLogin={handleLogin}
        />
      )}
      {screen === "register" && (
        <RegisterScreen navigateToLogin={navigateToLogin} />
      )}
      {screen === "menu" && (
        <MenuScreen 
          navigateToChat={navigateToChat} 
          navigateToAjuda={navigateToAjuda}
          navigateToEstatistica={navigateToEstatistica}
          navigateToDoacao={navigateToDoacao}
        />
      )}
      {screen === "chat" && <ChatScreen />}
      {screen === "ajuda" && <AjudaScreen />} 
      {screen === "estatistica" && <Estatistica />} 
      {screen === "doacao" && <Doacao />}
    </div>
  );
};

export default App;

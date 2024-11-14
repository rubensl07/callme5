import React, { useState } from "react";
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
  const [screen, setScreen] = useState("login");

  const navigateToCadastro = () => setScreen("cadastro");
  const navigateToLogin = () => setScreen("login");
  const navigateToMenu = () => setScreen("menu");
  const navigateToNotas = () => setScreen("notas");
  const navigateToChat = () => setScreen("chat");
  const navigateToAjuda = () => setScreen("ajuda"); 
  const navigateToEstatistica = () => setScreen("estatistica"); 
  const navigateToDoacao = () => setScreen("doacao");
  const navigateToPasswordRecovery1 = () => setScreen("passwordrecovery1");
  const navigateToPasswordRecovery2 = () => setScreen("passwordrecovery2");


  return (
    <div>
      {screen === "login" && (
        <Login
          navigateToCadastro={navigateToCadastro}
          navigateToMenu={navigateToMenu}
          navigateToPasswordRecovery1={navigateToPasswordRecovery1}
        />
      )}
      {screen === "cadastro" && (
        <Cadastro navigateToLogin={navigateToLogin} />
      )}
      {screen === "menu" && (
        <Menu 
          navigateToChat={navigateToChat} 
          navigateToAjuda={navigateToAjuda}
          navigateToEstatistica={navigateToEstatistica}
          navigateToDoacao={navigateToDoacao}
          navigateToNotas={navigateToNotas}
        />
      )}
            {screen === "notas" && (
        <Notas 
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
      {screen === "passwordrecovery1" && (<PasswordRecovery1 navigateToPasswordRecovery2={navigateToPasswordRecovery2}/>)}
      {screen === "passwordrecovery2" && <PasswordRecovery2 />}

      {screen === "profile" && <Profile />}
    </div>
  );
};

export default App;

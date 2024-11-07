import React from 'react'
import '../css/ChatScreen.css'
import Sidebar from '../components/Sidebar'

const ChatScreen = () => {
  return (

    <div className="chat-container">

      <Sidebar />

      <div className="sidebar">  
            
      <div className="choiceRow">
        <h2> Conversas </h2>
        <h2> Prioridades </h2>
      </div>

        <div className="sidebar-item">
          <img src="/img/Icon.png" alt="Luana Santos" className="profile-pic" />
          <span className="username">Luana Santos</span>
        </div>
        <div className="sidebar-item">
          <img src="/img/Icon.png" alt="Luis Souza" className="profile-pic" />
          <span className="username">Luis Souza</span>
          <span className="notification-badge">2</span>
        </div>
        <div className="sidebar-item">
          <img src="/img/Icon.png" alt="Rubens Santos" className="profile-pic" />
          <span className="username">Rubens Santos</span>
          <span className="notification-badge">5</span>
        </div>
        <div className="sidebar-item">
          <img src="/img/Icon.png" alt="Giovanna Cavalcante" className="profile-pic" />
          <span className="username">Giovanna Cavalcante</span>
        </div>
      </div>

      <div className="chat-section">
        <div className="chat-header">
          <img src="/img/Icon.png" alt="Giovanna Belo" className="header-profile-pic" />
          <span className="header-username">Giovanna Belo</span>
          <span className="status">Online</span>
          <div className="header-options">
            <button className="call-btn">📞</button>
            <button className="video-btn">📹</button>
            <span className="timer">3:19</span>
            <button className="close-btn">❌</button>
          </div>
        </div>

        <div className="chat-body">
          <div className="message incoming">
            <p>A vida é muito triste</p>
          </div>
          <div className="message-response">
            <p>Mensagem a caminho! <br />  Assim que o psicólogo puder, ele vai te dar um toque!</p>
          </div>
        </div>

        <div className="chat-actions">
          <button className="delete-request">Excluir solicitação</button>
          <button className="accept-request">Aceitar solicitação</button>
        </div>

        <div className="chat-input">
          <input type="text" placeholder="O que está acontecendo?" />
          <button className="send-btn">➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;

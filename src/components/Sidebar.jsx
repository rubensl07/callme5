import React from 'react';
// import styles from '../css/Sidebar.css';

const Sidebar = ({ navigateToMenu, navigateToChat, navigateToAjuda, navigateToEstatistica, navigateToDoacao }) => {
  return (
    <div className="menu">
      <div className="icones">
        <button className="notas" onClick={navigateToMenu}> 
          <img src="./img/notas.png" className='iconNota'/>
        </button>

        <button className='chat' onClick={navigateToChat}>
          <img src="./img/chat.png" className='iconChat' id='2' />
        </button>

        <button className='autoajuda' onClick={navigateToAjuda}>
          <img src="./img/autoajuda.png" className='iconAutoajuda' id='3' />
        </button>

        <button className='estatistica' onClick={navigateToEstatistica}>
          <img src="./img/estatistica.png" className='iconEstatistica' id='4' />
        </button>

        <button className='doacao' onClick={navigateToDoacao}>
          <img src="./img/doacao.png" className='iconDoacao' id='5' />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

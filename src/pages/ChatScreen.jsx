import React from 'react'
import styles from '../css/ChatScreen.module.css'
import Sidebar from '../components/Sidebar'

const ChatScreen = () => {
  const imgSrcTeste = "../img/Icon.png"
  return (

    <div className={styles.chatContainer}>

      <Sidebar />

      <div className={styles.sidebar}>  
            
      <div className={styles.choiceRow}>
        <h2> Conversas </h2>
        <h2> Prioridades </h2>
      </div>

        <div className={styles.sidebarItem}>
          <img src={imgSrcTeste} alt="Luana Santos" className={styles.profilePic} />
          <span className={styles.username}>Luana Santos</span>
        </div>
        <div className={styles.sidebarItem}>
          <img src={imgSrcTeste} alt="Luis Souza" className={styles.profilePic} />
          <span className={styles.username}>Luis Souza</span>
          <span className={styles.notificationBadge}>2</span>
        </div>
        <div className={styles.sidebarItem}>
          <img src={imgSrcTeste} alt="Rubens Santos" className={styles.profilePic} />
          <span className={styles.username}>Rubens Santos</span>
          <span className={styles.notificationBadge}>5</span>
        </div>
        <div className={styles.sidebarItem}>
          <img src={imgSrcTeste} alt="Giovanna Cavalcante" className={styles.profilePic} />
          <span className={styles.username}>Giovanna Cavalcante</span>
        </div>
      </div>

      <div className={styles.chatSection}>
        <div className={styles.chatHeader}>
          <img src={imgSrcTeste} alt="Giovanna Belo" className={styles.headerProfilePic} />
          <span className={styles.headerUsername}>Giovanna Belo</span>
          <span className={styles.status}>Online</span>
          <div className={styles.headerOptions}>
            <button className={styles.callBtn}>📞</button>
            <button className={styles.videoBtn}>📹</button>
            <span className={styles.timer}>3:19</span>
            <button className={styles.closeBtn}>❌</button>
          </div>
        </div>

        <div className={styles.chatBody}>
          <div className={`${styles.message} ${styles.incoming}`}>
            <p>A vida é muito triste</p>
          </div>
          <div className={styles.messageResponse}>
            <p>Mensagem a caminho! <br />  Assim que o psicólogo puder, ele vai te dar um toque!</p>
          </div>
        </div>

        <div className={styles.chatActions}>
          <button className={styles.deleteRequest}>Excluir solicitação</button>
          <button className={styles.acceptRequest}>Aceitar solicitação</button>
        </div>

        <div className={styles.chatInput}>
          <input type="text" placeholder="O que está acontecendo?" />
          <button className={styles.sendBtn}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;

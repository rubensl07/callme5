import React from 'react';
import styles from '../css/Sidebar.module.css';
import imgGallery from '../importsGallery.json';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import CallmeLogo from './CallmeLogo';

export default ({ tipoUsuario, navigateToNotas, navigateToChat, navigateToAjuda, navigateToEstatistica, navigateToDoacao }) => {
  const imgGalleryNav = imgGallery.nav
  const pageList = [
    { nome: "Notas", onClick: navigateToNotas, imgSrc: imgGalleryNav.nota.src },
    { nome: "Chat", onClick: navigateToChat, imgSrc: imgGalleryNav.chat.src },
    { nome: "Autoajuda", onClick: navigateToAjuda, imgSrc: imgGalleryNav.autoajuda.src },
    tipoUsuario === 1 ?
      { nome: "Diário" } :
      { nome: "Estatísticas", onClick: navigateToEstatistica, imgSrc: imgGalleryNav.estatistica.src },
    { nome: "Doação", onClick: navigateToDoacao, imgSrc: imgGalleryNav.doacao.src },
  ];
const sidebarSize='7vw'
  return (<>
  <div style={{height:'100vh', marginRight:sidebarSize}}></div>
      <aside className={styles.container} style={{width:sidebarSize}} id='sidebar'>
        <CallmeLogo noText={true}/>
      <div>
        {pageList.map((page, index) => (
          <a key={index} onClick={page.onClick} className={styles.icon}>
            <img src={page.imgSrc} alt={`${page.nome} Icon`} className={styles.icon} />
          </a>
        ))}
      </div>
    </aside>
  </>

  );
};


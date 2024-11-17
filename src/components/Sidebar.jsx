import styles from '../css/Sidebar.module.css';
import imgGallery from '../importsGallery.json';
import { useNavigate } from 'react-router-dom';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import CallmeLogo from './CallmeLogo';

export default ({ tipoUsuario, selectedPageIndex }) => {
  const navigate = useNavigate();

  const imgGalleryNav = imgGallery.nav
  const pageList = [
    { nome: "Notas", onClick: () => { navigate('/notas') }, imgSrc: imgGalleryNav.nota.src },
    { nome: "Chat", onClick: () => { navigate('/chat') }, imgSrc: imgGalleryNav.chat.src },
    { nome: "Autoajuda", onClick: () => { navigate('/autoajuda') }, imgSrc: imgGalleryNav.autoajuda.src },
    tipoUsuario === 1 ?
      { nome: "Diário", onClick: () => { navigate('/diario') }, imgSrc: imgGalleryNav.diario.src } :
      { nome: "Estatísticas", onClick: () => { navigate('/estatistica') }, imgSrc: imgGalleryNav.estatistica.src },
    { nome: "Doação", onClick: () => { navigate('/doacao') }, imgSrc: imgGalleryNav.doacao.src },
  ];
  const sidebarSize = '7vw'
  return (<>
    <div style={{ height: '100vh', marginRight: sidebarSize }}></div>
    <aside className={styles.container} style={{ width: sidebarSize }} id='sidebar'>
      <CallmeLogo noText={true} />
      <div>
        {pageList.map((page, index) => (
          <div key={index} className={styles.iconDiv}>
            <a onClick={page.onClick} className={styles.icon}>
              <img src={page.imgSrc} alt={`${page.nome} Icon`} className={styles.icon} />
            </a>            
            {selectedPageIndex && selectedPageIndex==(index+1)?<div className={styles.point}></div>:<></>}
          </div>
        ))}
      </div>
    </aside>
  </>

  );
};


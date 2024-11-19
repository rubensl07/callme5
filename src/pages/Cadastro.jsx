import React, { useState, useRef, useEffect } from "react";
import Cliente from "../components/Cliente";
import Estudante from "../components/Estudante";
import Profissional from "../components/Profissional";
import styles from '../css/Cadastro.module.css'
import imgGallery from '../importsGallery.json'
import AvatarList from "../components/avatarList";
import { getAvatares } from "../../funcoes";



export default ({onLoad}) => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [showAvatarList,setShowAvatarList] = useState(false)
  const [listaAvatares, setListaAvatares] = useState([]);
  const [avatar, setAvatar] = useState({src:null,id:null});
  useEffect(() => {
    const obterAvatares = async () => {
        try {
            const data = await getAvatares();
            setListaAvatares(data || []);
        } catch (error) {
            console.error("Erro ao obter avatares:", error);
        }
    };
    obterAvatares();
}, [onLoad]);


const handleSelectAvatar = (avatar) => {   
  setAvatar(avatar);
};


  const clienteRef = useRef(null);
  const estudanteRef = useRef(null);
  const profissionalRef = useRef(null);

  const handleCreateCadastro = [
    () => {
      if (clienteRef.current) {
        clienteRef.current.handleRegister();
      }
    },
    () => {
      if (estudanteRef.current) {
        estudanteRef.current.handleRegister();
      }
    },
    () => {
      if (profissionalRef.current) {
        profissionalRef.current.handleRegister();
      }
    }
  ];

  const handleButtonClick = () => {
    const acaoBotaoCadastro = handleCreateCadastro[tipoUsuarioCriado - 1];
    if (acaoBotaoCadastro) {
      acaoBotaoCadastro();
    }
  };

  const [tipoUsuarioCriado, setTipoUsuarioCriado] = useState(1);

  function changeRole(role, event) {
    document.querySelectorAll(`.${styles.selecionado}`).forEach(el => {
      el.classList.remove(styles.selecionado);
    });
    event.currentTarget.classList.add(styles.selecionado);
    setTipoUsuarioCriado(role);
  }


  const imagemMacallme = imgGallery.macallme.macallmeHugging

  return (
    <div className={styles.container}>
                              {showAvatarList && (
                <AvatarList
                    listaAvatares={listaAvatares}
                    onClose={() => setShowAvatarList(false)}
                    onSelectAvatar={handleSelectAvatar}
                />
            )}
      <div className={styles.content}>
        <div className={styles.topSide}>
          <header>
            <img src={imgGallery.logoText.src} alt={imgGallery.logoText.alt} />
            <h2>Para quando o mundo parecer turbulento</h2>
          </header>
          <ul>
            <li onClick={(e) => changeRole(1, e)} className={`${styles.selecionado}`}>Quero desabafar</li>
            <li onClick={(e) => changeRole(2, e)} className={``}>Estudo psicologia</li>
            <li onClick={(e) => changeRole(3, e)} className={``}>Sou psicólogo</li>
          </ul>
        </div>

        <main>
          {tipoUsuarioCriado === 1 ? (
            <Cliente avatar={avatar} ref={clienteRef} checkboxState = {checkboxState} styles={styles} setShowAvatarList={setShowAvatarList}/>
          ) : tipoUsuarioCriado === 2 ? (
            <Estudante ref={estudanteRef} checkboxState = {checkboxState} styles={styles} />
          ) : (
            <Profissional ref={profissionalRef} checkboxState = {checkboxState} styles={styles} />
          )}
        </main>


        <div className={styles.bottomSide}>
          <div className={`${styles.checkboxField}`}>
            <input checked={checkboxState} onChange={(e)=>{setCheckboxState(e.target.checked)}}
            type="checkbox" id="checkboxValidate" />
            <label htmlFor="checkboxValidate">
              Aceito os {" "}
                <span onClick={(e)=>{
                  e.preventDefault()
                  e.stopPropagation()
                  }}>
                  termos e condições
                </span>
                .
            </label>
          </div>

          <button onClick={handleButtonClick}>Criar Conta</button>
        </div>

      </div>
      <aside className={styles.aside}>
        <p>Junte-se a nós, cadastre-se agora!</p>
        <img src={imagemMacallme.src} alt={imagemMacallme.alt}/>
      </aside>
    </div>
  );
}

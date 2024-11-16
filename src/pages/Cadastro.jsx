import React, { useState, useRef } from "react";
import Cliente from "../components/Cliente";
import Estudante from "../components/Estudante";
import Profissional from "../components/Profissional";
import styles from '../css/Cadastro.module.css'
import imgGallery from '../importsGallery.json'



export default () => {
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
            <Cliente ref={clienteRef} styles={styles} />
          ) : tipoUsuarioCriado === 2 ? (
            <Estudante ref={estudanteRef} styles={styles} />
          ) : (
            <Profissional ref={profissionalRef} styles={styles} />
          )}
        </main>


        <div className={styles.bottomSide}>
          <div className={`${styles.checkboxField}`}>
            <input type="checkbox" id="checkboxValidate" />
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

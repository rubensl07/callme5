import React, { useState, useRef } from "react";
import Cliente from "../components/Cliente";
import Estudante from "../components/Estudante";
import Profissional from "../components/Profissional";
import styles from '../css/Cadastro.module.css'
import imgLogoTexto from '../img/logo-texto.png';
import imgMacallmeHugging from '../img/macallme-hugging.png'


export default () =>{
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
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <img src={imgLogoTexto} alt="Logotipo do site" />
          <h2>Para quando o mundo parecer turbulento</h2>
        </header>
        <ul className={styles.ul}>
          <li onClick={(e) => changeRole(1, e)} className={`${styles.selecionado}`}>Quero desabafar</li>
          <li onClick={(e) => changeRole(2, e)} className={``}>Estudo psicologia</li>
          <li onClick={(e) => changeRole(3, e)} className={``}>Sou psicólogo</li>
        </ul>
        <main>
          {tipoUsuarioCriado === 1 ? (
            <Cliente ref={clienteRef} styles={styles} />
          ) : tipoUsuarioCriado === 2 ? (
            <Estudante ref={estudanteRef} styles={styles} />
          ) : (
            <Profissional ref={profissionalRef} styles={styles} />
          )}
        </main>


        <div className={`${styles.checkboxField}`}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Aceito os <span>termos e condições</span>.</label>
        </div>

        <button onClick={handleButtonClick}>Criar Conta</button>
      </div>
      <aside className={styles.aside}>
        <p>Junte-se a nós, cadastre-se agora!</p>
        <img src={imgMacallmeHugging} alt="Macallme segurando uma banana e sonhando" />
      </aside>
    </div>
  );
}

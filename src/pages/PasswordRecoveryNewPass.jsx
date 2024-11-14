import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/PasswordRecovery.module.css';
import imgGallery from '../importsGallery.json'
import { enviarPasswordRecovery } from "../../funcoes";
import CallmeLogo from "../components/CallmeLogo";
// import { validateLogin } from "../../funcoes";


export default () => {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [senhaNova, setSenhaNova] = useState("");

  const handleClick = async (e) => {
    let response = null
    const dados = {
      codigo,
      senha: senhaNova
    }
    let validateStatus = true

    if (validateStatus && (dados.email == null || dados.email == undefined || dados.email == '')) {
      validateStatus = false
      alert("Campos vazios");
    }
    if (validateStatus) {
      response = await enviarPasswordRecovery(dados)
      // navigate('/passwordrecovery1')
    }

  };

  return (
    <div className={styles.container}>
      <header>
      <CallmeLogo/>
      <div>
          <h1>Redefinir senha</h1>
        </div>
      </header>
      <main>
        <h2>Preencha os dados abaixo para solicitar a recuperação de senha</h2>
        <div>
          <div>
            <div className={styles.inputField}>
              <p>CÓDIGO</p>
              <div>
                <input type="text" placeholder="000-000" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
              </div>
            </div>
            <p>Código incorreto! Talvez tenha se confundido...</p>
          </div>
          <div>
            <div className={styles.inputField}>
              <p>Nova senha</p>
              <div>
                <input type="text" value={senhaNova} onChange={(e) => setSenhaNova(e.target.value)} />
              </div>
            </div>
            <p>Sua senha deve possuir:</p>
            <ul className={styles.checklist}>
              <div>
                <div className={styles.checkfield}></div>
                <p>No mínimo 8 caracteres</p>
              </div>
              <div>
                <div className={styles.checkfield}></div>
                <p>Número</p>
              </div>
              <div>
                <div className={styles.checkfield}></div>
                <p>Letra maiúscula</p>
              </div>
              <div>
                <div className={styles.checkfield}></div>
                <p>Letra minúscula</p>
              </div>
              <div>
                <div className={styles.checkfield}></div>
                <p>Caractere Especial</p>
              </div>
            </ul>
          </div>
        </div>
        <button onClick={handleClick}>Alterar senha</button>
      </main>

    </div>)


}
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/PasswordRecovery.module.css';
import imgGallery from '../importsGallery.json'
import { enviarPasswordRecovery } from "../../funcoes";
import CallmeLogo from "../components/CallmeLogo";
// import { validateLogin } from "../../funcoes";


export default () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const imagemMacallme = imgGallery.macallme.macallmeTherapy
  const handleClick = async (e) => {
    let response = null
    const dados = {
      email
    }
    let validateStatus = true    
    if (validateStatus && (dados.email == null || dados.email == undefined || dados.email == '')) {
        validateStatus = false
        alert("Campos vazios");
    }
    if (validateStatus) {
        response = await enviarPasswordRecovery(dados)
        navigate('/passwordrecovery2')
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
            <p>Seu e-mail de acesso:</p>
            <div className={styles.inputField}>
              <p>E-mail</p>
              <div>
                <input type="text" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <p>Você irá receber um e-mail no endereço informado acima contendo o procedimento para criar uma nova senha para esse usuário </p>
          </div>
          <div className={styles.macallmeContainer}>
            <img src={imagemMacallme.src} alt={imagemMacallme.alt}/>
          </div>
        </div>
        <button style={{alignSelf:"start"}} onClick={handleClick}>Enviar</button>
      </main>

    </div>)


}
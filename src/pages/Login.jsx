import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/Login.module.css';
import imgGallery from '../importsGallery.json'
import { validateLogin } from "../../funcoes";
import CallmeLogo from "../components/CallmeLogo";

export default () => {
  const navigate = useNavigate();
  const imagemMacallme = imgGallery.macallme.macallmeTherapy
  const [passIcon, setPassIcon] = useState(imgGallery.hidePass);
  const [currentVisibilityState, setCurrentVisibilityState] = useState('password');
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  let showPass = false;

  const handleLoginClick = async (e) => {
    
    let response = null
    const dados = {
      login,
      senha,
    }
    let validateStatus = true
    if (validateStatus && (dados.login == null || dados.login == undefined || dados.login == '' || dados.senha == null || dados.senha == undefined || dados.senha == '')) {
      validateStatus = false
      alert("Campos vazios");
    }
    if (validateStatus) {
      response = await validateLogin(dados)
      const code = response.data.code
      if (code == 0) {
        alert("Essa conta não existe")
      }
      if (code == 2) {
        alert("Senha incorreta")
      }
    }    
let teste = true
    if (response?.success || teste) {
      navigate('/menu');
    }
  };

  function toggleShowPass() {
    if (showPass) {
      setCurrentVisibilityState('password');
      setPassIcon(imgGallery.hidePass);
    } else {
      setCurrentVisibilityState('text');
      setPassIcon(imgGallery.showPass);
    }
    showPass = !showPass;
  }
  return (
    <div className={styles.container}>
      <aside>
        <p>Seja bem vindo ao Callme!<br />Faça seu login!
        </p>
        <img src={imagemMacallme.src} alt={imagemMacallme.alt}/>
      </aside>
      <div className={styles.content}>
        <header>
        <CallmeLogo/>
          <h2>Para quando o mundo parecer turbulento</h2>
        </header>
        <main>
          <div className={styles.inputFieldContainer}>
            <div>
              <p>E-mail</p>
              <div>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Digite seu e-mail"/>
              </div>
            </div>
            <div>
              <p>Senha</p>
              <div>
                <input type={currentVisibilityState} value={senha} placeholder="Digite sua senha"  onChange={(e) => setSenha(e.target.value)} />
                <img onClick={toggleShowPass} src={passIcon.src} alt={passIcon.alt}/>
              </div>
            </div>
          </div>
          <a className={styles.forgotPasswordText} onClick={()=>navigate('/passwordrecovery1')}>
            Esqueci minha senha
          </a>
        </main>
        <div className={styles.buttonField}>
          <button onClick={handleLoginClick}>Login</button>
          <div className={styles.cadastroField}>
            <p onClick={()=>navigate('cadastro')}>
              Não tem uma conta? Faça o seu cadastro
            </p>
          </div>
        </div>
      </div>

    </div>
  )
};


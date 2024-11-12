import React, { useState } from "react";
import styles from '../css/LoginScreen.module.css';
import { validateLogin } from "../../funcoes";

export default ({ navigateToRegister, navigateToMenu, navigateToPasswordRecovery }) => {
  const hidePassIcon = ("./src/img/offshowpass.png");
  const showPassIcon = ("./src/img/onshowpass.png");
  const imgMacallmeTherapy = '/src/img/macallme-therapy.png'
  const imgLogoTexto = '/src/img/logoCallme.png'
  const [passIcon, setPassIcon] = useState(hidePassIcon);
  const [currentVisibilityState, setCurrentVisibilityState] = useState('password');
  const [login, setLogin] = useState("teste@email");
  const [senha, setSenha] = useState("12345678");
  let showPass = false;


  const handleLoginClick = async (e) => {
    let response = null
    const dados = {
      login,
      senha,
    }
    let validateStatus = true

    console.log(dados);
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
    if (response.success) {
      navigateToMenu();
    }
  };

  function toggleShowPass() {
    if (showPass) {
      setCurrentVisibilityState('password');
      setPassIcon(hidePassIcon);
    } else {
      setCurrentVisibilityState('text');
      setPassIcon(showPassIcon);
    }
    showPass = !showPass;
  }
  return (
    <div className={styles.container}>
      <aside>
        <p>Seja bem vindo ao Callme!<br />Faça seu login!
        </p>
        <img src={imgMacallmeTherapy} alt="Macallme terapia" />
      </aside>
      <div className={styles.content}>
        <header>
          <img src={imgLogoTexto} alt="Logotipo do site" />
          <h2>Para quando o mundo parecer turbulento</h2>
        </header>
        <main>
          <div className={styles.inputFieldContainer}>
            <div>
              <p>E-mail</p>
              <div>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
              </div>
            </div>
            <div>
              <p>Senha</p>
              <div>
                <input type={currentVisibilityState} value={senha} placeholder="Digite sua senha"  onChange={(e) => setSenha(e.target.value)} />
                <img id="showPassIcon" onClick={toggleShowPass} src={passIcon} />
              </div>
            </div>
          </div>
          <a className={styles.forgotPasswordText} onClick={navigateToPasswordRecovery}>
            Esqueci minha senha
          </a>
        </main>
        <div className={styles.buttonField}>
          <button onClick={handleLoginClick}>Login</button>
          <div className={styles.cadastroField}>
            <p onClick={navigateToRegister}>
              Não tem uma conta? Faça o seu cadastro
            </p>
          </div>
        </div>
      </div>

    </div>
  )
};


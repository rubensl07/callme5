import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/Login.module.css';
import imgGallery from '../importsGallery.json';
import { getUsuario, validateLogin } from "../../funcoes";
import CallmeLogo from "../components/CallmeLogo";
import { AuthContext } from "../../Contexts/AuthContext";

export default () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const imagemMacallme = imgGallery.macallme.macallmeTherapy;
  const [passIcon, setPassIcon] = useState(imgGallery.hidePass);
  const [currentVisibilityState, setCurrentVisibilityState] = useState('password');
  const [login, setLogin] = useState("cliente10@email");
  const [senha, setSenha] = useState("senhaTeste123");

  let showPass = false;

  const handleLoginClick = async () => {
    let response = null;
    const dados = { login, senha };
    let validateStatus = true;

    if (!login || !senha) {
      validateStatus = false;
      alert("Campos vazios");
    }

    if (validateStatus) {
      response = await validateLogin(dados);
      const code = response?.data?.code;

      if (code === 0) {
        alert("Essa conta não existe");
        return;
      }
      if (code === 2) {
        alert("Senha incorreta");
        return;
      }

      if (response?.success) {
        const dadosUser = await getUsuario(response.data.id);
        delete dadosUser.senha
        setAuth({
          isAuthenticated: true,
          user: dadosUser
        });        
        navigate('/perfil'); 
        alert("Logado com sucesso");
      }
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
        <p>Seja bem vindo ao Callme!<br />Faça seu login!</p>
        <img src={imagemMacallme.src} alt={imagemMacallme.alt} />
      </aside>
      <div className={styles.content}>
        <header>
          <CallmeLogo />
          <h2>Para quando o mundo parecer turbulento</h2>
        </header>
        <main>
          <div className={styles.inputFieldContainer}>
            <div>
              <p>E-mail</p>
              <div>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Digite seu e-mail" />
              </div>
            </div>
            <div>
              <p>Senha</p>
              <div>
                <input type={currentVisibilityState} value={senha} placeholder="Digite sua senha" onChange={(e) => setSenha(e.target.value)} />
                <img onClick={toggleShowPass} src={passIcon.src} alt={passIcon.alt} />
              </div>
            </div>
          </div>
          <a className={styles.forgotPasswordText} onClick={() => navigate('/passwordrecoveryMailSend')}>
            Esqueci minha senha
          </a>
        </main>
        <div className={styles.buttonField}>
          <button onClick={handleLoginClick}>Login</button>
          <div className={styles.cadastroField}>
            <p onClick={() => navigate('/cadastro')}>
              Não tem uma conta? Faça o seu cadastro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import '../css/LoginScreen.css';
import { validateLogin } from "../../funcoes";

const LoginScreen = ({ navigateToRegister, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const teste = true

    let response = null
    const dados = {
      login: email,
      senha: password,
    }
    let validateStatus = true

    if (validateStatus && (email == null || email == undefined || email == ''||password== null || password == undefined || password == '')) {
      validateStatus = false
      alert("Campos vazios");
    }
    if(validateStatus){
      response = await validateLogin(dados)
      const code = response.data.code
      if(code == 0){
        alert("Essa conta não existe")
      }
      if(code == 2){
        alert("Senha incorreta")
      }
    }
    if(response.success || teste){
      handleLogin();
    }
  };

  return (
    <div className="LoginScreen">
      <form action="#">

        <div className="ladoEsquerdo">
          
          <h1>
            Seja bem vindo ao Callme!
             <br /> 
             Faça seu login.
             </h1>

          <img src="./img/macallme.png" className="" alt="logo" />

        </div>

        <div className="ladoDireito">
          
          <img src="./img/logoCallme.png" className="logoCallme" alt="logo" />

          <div className="groupInput">
            <div className="emailLogin">
              <p> </p>
              <input className="input-wrapper"  type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

              <div className="senhaLogin">
                <p> </p>
                  <input className="input-wrapper" type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
          </div>

          <a href="#" className="forgot-password">Esqueci minha senha</a>

          <button className="botaoLogin" type="submit" onClick={handleSubmit}> Login </button>
          <div className="backgroundEntrar"></div>

          <button className="botaoCadastro" type="submit" onClick={navigateToRegister}> Cadastre-se </button>
          <div className="backgroundCadastro"></div>

        </div>

      </form>
    </div>
  );
};

export default LoginScreen;
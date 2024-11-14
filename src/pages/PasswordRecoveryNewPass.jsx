import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/PasswordRecovery.module.css';
import imgGallery from '../importsGallery.json'
import { enviarPasswordRecovery, validarSenha } from "../../funcoes";
import CallmeLogo from "../components/CallmeLogo";

export default () => {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [minCharacterState, setMinCharacterState] = useState(false);
  const [numberState, setNumberState] = useState(false);
  const [lowerCaseState, setLowerCaseState] = useState(false);
  const [upperCaseState, setUpperCaseState] = useState(false);
  const [specialCharacterState, setSpecialCharacterState] = useState(false);

  let botaoClicado = false
  const handleClick = async (e) => {
    botaoClicado = true
    if(botaoClicado){
      let response = null;
      const validatePassword = validarSenha(senhaNova)
      const resultValidatePassword = validatePassword.result
  
      let validateStatus = true;
      const dados = {
        codigo,
        senha: senhaNova
      };
      if (validateStatus && (dados.codigo == null || dados.codigo == undefined || dados.codigo == '' ||dados.senha == null || dados.senha == undefined || dados.senha == '')) {
        validateStatus = false;
        alert("Campos vazios");
      } else {
        if(resultValidatePassword){
          if (validateStatus) {
            response = await enviarPasswordRecovery(dados);
            alert("Senha alterada com sucesso");
            navigate('/')
          }
        } else {
          alert("Sua senha não atende aos parâmetros estabelecidos pela aplicação")
        }
  
      }
    }
   
    
  };

  const digitarNovaSenha = (value) => {
    setSenhaNova(value);
    const resultValidatePassword = validarSenha(value)
    
    setMinCharacterState(resultValidatePassword.detalhes.minCharacter);
    setNumberState(resultValidatePassword.detalhes.number); 
    setLowerCaseState(resultValidatePassword.detalhes.lowerCase); 
    setUpperCaseState(resultValidatePassword.detalhes.upperCase);
    setSpecialCharacterState(resultValidatePassword.detalhes.specialCharacter);
  };

  return (
    <div className={styles.container}>
      <header>
        <CallmeLogo />
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
                <input
                  type="text"
                  placeholder="000-000"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
            </div>
            <p>Código incorreto! Talvez tenha se confundido...</p>
          </div>
          <div>
            <div className={styles.inputField}>
              <p>Nova senha</p>
              <div>
                <input
                  type="text"
                  value={senhaNova}
                  onChange={(e) => digitarNovaSenha(e.target.value)}
                />
              </div>
            </div>
            <p>Sua senha deve possuir:</p>
            <ul className={styles.checklist}>
              <div>
                <div
                  className={`${styles.checkfield} ${minCharacterState ? styles.checked : ''}`}
                ></div>
                <p>No mínimo 8 caracteres</p>
              </div>
              <div>
                <div
                  className={`${styles.checkfield} ${numberState ? styles.checked : ''}`}
                ></div>
                <p>Número</p>
              </div>
              <div>
                <div
                  className={`${styles.checkfield} ${upperCaseState ? styles.checked : ''}`}
                ></div>
                <p>Letra maiúscula</p>
              </div>
              <div>
                <div
                  className={`${styles.checkfield} ${lowerCaseState ? styles.checked : ''}`}
                ></div>
                <p>Letra minúscula</p>
              </div>
              <div>
                <div
                  className={`${styles.checkfield} ${specialCharacterState ? styles.checked : ''}`}
                ></div>
                <p>Caractere Especial</p>
              </div>
            </ul>
          </div>
        </div>
        <button onClick={handleClick}>Alterar senha</button>
      </main>
    </div>
  );
};

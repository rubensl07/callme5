import React, { useState } from "react";
import styles from '../css/PasswordRecovery.module.css';
import imgGallery from '../importsGallery.json'
// import { validateLogin } from "../../funcoes";


export default () => {

    const imgLogoTexto = '/src/img/logoCallme.png'
    const [email, setEmail] = useState("teste@email");
    return (
        <div className={styles.container}>
            <header>
                <img src={imgLogoTexto} alt="" />
                <div>
                    <h1>Redefinir senha</h1>
                </div>
            </header>
            <main>
                <div>
                    <h2>Preencha os dados abaixo para solicitar a recuperação de senha</h2>
                    <div>
                        <p>Seu email de acesso:</p>
                        <div className={styles.mailInputField}>
                            <p>E-mail</p>
                            <div>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <p style={{width:'40%'}}>Você irá receber um e-mail no endereço informado acima, contendo o procedimento para criar uma nova senha. </p>
                    <button>Enviar</button>
                </div>
                <aside>
                    <img src={imgGallery.macallmeTherapy.src} alt={imgGallery.macallmeTherapy.alt}/>
                </aside>
            </main>

        </div>)


}
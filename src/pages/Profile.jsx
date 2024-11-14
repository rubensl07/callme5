import React, { useState } from "react";
import styles from '../css/Profile.module.css'
import Sidebar from "../components/Sidebar.jsx"
import imgGallery from '../importsGallery.json';

export default ({ }) => {
        const [nome, setNome] = useState("Augusto Fernando");
        const [email, setEmail] = useState("teste@email");
        const [nascimento, setNascimento] = useState("2000-01-01");
        return (
                <div className={styles.container}>
                        <Sidebar />
                        <div className={styles.content}>
                                <div className={styles.avatarContainer}>
                                        <div className={styles.focusAvatar}>
                                                <img src="https://i.natgeofe.com/k/093c14b4-978e-41f7-b1aa-3aff5d1c608a/gray-wolf-closeup_square.jpg" alt="" />
                                        </div>
                                        <div className={styles.avatarHorizontalList}>
                                                <div>
                                                        <div className={styles.imgContainer}>
                                                                <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="" />
                                                        </div>
                                                        <div className={styles.imgContainer}>
                                                                <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="" />
                                                        </div>
                                                </div>
                                                <div style={{ justifyContent: "end" }}>
                                                <div className={styles.imgContainer}>
                                                                <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="" />
                                                        </div>
                                                        <div className={styles.imgContainer}>
                                                                +
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className={styles.inputFieldContainer}>
                                        <div className={styles.inputFields}>
                                                <div className={styles.nomeField}>
                                                        <p>
                                                                Nome
                                                        </p>
                                                        <div>
                                                                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                                        </div>
                                                </div>
                                                <div className={styles.emailField}>
                                                        <p>
                                                                E-mail

                                                        </p>
                                                        <div>
                                                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></div>

                                                </div>
                                                <div className={styles.nascimentoField}>
                                                        <p>
                                                                Data de nascimento
                                                        </p>
                                                        <div>
                                                                <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
                                                        </div>
                                                </div>
                                                <a className={styles.trocarSenhaField}>
                                                        <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
                                                        <p>
                                                                Trocar Senha
                                                        </p>
                                                </a>
                                                <a className={styles.historicoNotasField}>
                                                        <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
                                                        <p>
                                                                Ver histórico de notas
                                                        </p>
                                                </a>

                                        </div>
                                        <div className={styles.buttons}>
                                                <button>Sair da conta</button>
                                                <button>Excluir conta</button>
                                        </div>
                                </div>
                        </div>
                </div>)
}
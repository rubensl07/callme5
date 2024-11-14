import React, { useState, useEffect } from "react";
import styles from '../css/Profile.module.css';
import Sidebar from "../components/Sidebar.jsx";
import imgGallery from '../importsGallery.json';
import { getAvatares } from "../../funcoes.js";
import AvatarList from "../components/avatarList.jsx";

export default ({ onLoad }) => {
    // Initialize state variables at the top of the component
    const [nome, setNome] = useState("Augusto Fernando");
    const [email, setEmail] = useState("teste@email");
    const [nascimento, setNascimento] = useState("2000-01-01");
    const [listaAvatares, setListaAvatares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conteudo, setConteudo] = useState(false);
    const [foco, setFoco] = useState(true);
    const [info, setInfo] = useState({});

    useEffect(() => {
        console.log("useEffect triggered");
        const obterAvatares = async () => {
            try {
                const data = await getAvatares();
                setListaAvatares(data || []);
            } catch (error) {
                console.error("Erro ao obter avatares:", error);
            } finally {
                setLoading(false);
            }
        };
        obterAvatares();
    }, [onLoad]);
    
    if (loading) return <p>Carregando...</p>;


    return (
        <div className={styles.container}>
            <AvatarList listaAvatares={listaAvatares}/>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.avatarContainer}>
                    <div className={styles.focusAvatar}>
                        <img src="https://i.natgeofe.com/k/093c14b4-978e-41f7-b1aa-3aff5d1c608a/gray-wolf-closeup_square.jpg" alt="Avatar" />
                    </div>
                    <div className={styles.avatarHorizontalList}>
                        <div>
                            <div className={styles.imgContainer}>
                                <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="Avatar 1" />
                            </div>
                            <div className={styles.imgContainer}>
                                <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="Avatar 2" />
                            </div>
                        </div>
                        <div style={{ justifyContent: "end" }}>
                            <div className={styles.imgContainer}>
                                <img src="https://wolf.org/wp-content/uploads/2021/04/wcs_2009_DN_snow_portrait.jpg" alt="Avatar 3" />
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
                            <p>Nome</p>
                            <div>
                                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.emailField}>
                            <p>E-mail</p>
                            <div>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.nascimentoField}>
                            <p>Data de nascimento</p>
                            <div>
                                <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
                            </div>
                        </div>
                        <a className={styles.trocarSenhaField}>
                            <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
                            <p>Trocar Senha</p>
                        </a>
                        <a className={styles.historicoNotasField}>
                            <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
                            <p>Ver histórico de notas</p>
                        </a>
                    </div>
                    <div className={styles.buttons}>
                        <button>Sair da conta</button>
                        <button>Excluir conta</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

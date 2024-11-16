import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/Profile.module.css';
import Sidebar from "../components/Sidebar.jsx";
import imgGallery from '../importsGallery.json';
import { editCliente, getAvatares, validarEmail } from "../../funcoes.js";
import AvatarList from "../components/avatarList.jsx";
import ImageFocus from "../components/imageFocus.jsx";
import { AuthContext } from "../../Contexts/AuthContext";

export default ({ onLoad }) => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const infoUser = auth.user;
    
    const [nome, setNome] = useState(infoUser.nome);
    const [email, setEmail] = useState(infoUser.login);
    const [nascimento, setNascimento] = useState(infoUser.data_nascimento.substring(0, 10));
    const [idAvatar, setIdAvatar] = useState(infoUser.id_avatar);
    const [listaAvatares, setListaAvatares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAvatarList, setShowAvatarList] = useState(false);
    const [showFocusImage, setShowFocusImage] = useState(false);
    const [srcFotoPerfil, setSrcFotoPerfil] = useState(infoUser.foto);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
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

    const handleLogout = () => {
        setAuth({ isAuthenticated: false, user: null });
    };

    const handleExclude = () => {
        setShowDeleteConfirmation(true); // Show confirmation modal
    };

    const confirmDelete = async () => {
        // Add API call for account deletion if needed here
        setShowDeleteConfirmation(false);
        handleLogout();
        alert("Conta excluída com sucesso.");
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false); // Close confirmation modal
    };

    const handleUpdate = async () => {
        if (validarEmail(email)) {
            const dados = {
                login: email,
                nome,
                nascimento,
                idAvatar
            };
            const response = await editCliente(dados, infoUser.id);
            if (response.success) {
                const dadosAtualizados = {
                    login: dados.login,
                    nome: dados.nome,
                    data_nascimento: dados.nascimento,
                    id_avatar: dados.idAvatar,
                    foto: srcFotoPerfil
                };

                // Update the context state immutably
                setAuth(prevState => ({
                    ...prevState,
                    user: { ...prevState.user, ...dadosAtualizados }
                }));

                alert("Perfil modificado com sucesso.");
                console.log(response);
            } else {
                alert("Ocorreu um erro");
            }
        } else {
            alert("Erro: E-mail inválido");
        }
    };

    const handleSelectAvatar = (avatar) => {
        setSrcFotoPerfil(avatar.img);
        setIdAvatar(avatar.id);
    };

    return (
        <div className={styles.container}>
            {showAvatarList && (
                <AvatarList
                    listaAvatares={listaAvatares}
                    onClose={() => setShowAvatarList(false)}
                    onSelectAvatar={handleSelectAvatar}
                />
            )}
            <Sidebar />
            {showFocusImage && <ImageFocus src={srcFotoPerfil} onClose={() => setShowFocusImage(false)} />}
            {showDeleteConfirmation && (
                <div className={styles.deleteConfirmationModal}>
                    <p>Tem certeza de que deseja excluir sua conta?</p>
                    <button onClick={confirmDelete}>Sim</button>
                    <button onClick={cancelDelete}>Cancelar</button>
                </div>
            )}
            <div className={styles.content}>
                <div className={styles.avatarContainer}>
                    <div className={styles.focusAvatar}>
                        <img src={srcFotoPerfil} alt="Avatar" onClick={() => setShowFocusImage(true)} />
                    </div>
                    <div className={styles.avatarContent} onClick={() => setShowAvatarList(!showAvatarList)}>
                        <p>Trocar avatar</p>
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
                        <a className={styles.trocarSenhaField} onClick={() => navigate('/passwordRecoveryMailSend')}>
                            <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
                            <p>Trocar Senha</p>
                        </a>
                        <a className={styles.historicoNotasField}>
                            <img src={imgGallery.lockIcon.src} alt={imgGallery.lockIcon.alt} />
                            <p>Ver histórico de notas</p>
                        </a>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={handleExclude}>Excluir conta</button>
                        <button onClick={handleLogout}>Sair da conta</button>
                        <button onClick={handleUpdate}>Atualizar informações</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

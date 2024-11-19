import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/Profile.module.css';
import Sidebar from "../components/Sidebar.jsx";
import imgGallery from '../importsGallery.json';
import { editCliente, editEstudante,editProfissional, getAvatares, validarEmail } from "../../funcoes.js";
import AvatarList from "../components/avatarList.jsx";
import ImageFocus from "../components/imageFocus.jsx";
import { AuthContext } from "../../Contexts/AuthContext";
import Cliente from "../components/ProfileCliente.jsx"
import Estudante from "../components/ProfileEstudante.jsx"
import Profissional from "../components/ProfileProfissional.jsx"


export default ({ onLoad }) => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const infoUser = auth.user;
    const tipoUsuario = infoUser.tipo_usuario

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
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = async () => {
        setShowDeleteConfirmation(false);
        handleLogout();
        alert("Conta excluída com sucesso.");
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleUpdate = async (tipoUsuario, dados) => {
        if (validarEmail(email)) {
            if (tipoUsuario == 1) {
                const response = await editCliente(dados, infoUser.id);
                if (response.success) {
                    const dadosAtualizados = {
                        login: dados.login,
                        nome: dados.nome,
                        data_nascimento: dados.nascimento,
                        id_avatar: dados.idAvatar,
                        foto: srcFotoPerfil
                    };
                    setAuth(prevState => ({
                        ...prevState,
                        user: { ...prevState.user, ...dadosAtualizados }
                    }));
                    alert("Perfil modificado com sucesso.");
                } else {
                    alert("Ocorreu um erro");
                }
            }
            if (tipoUsuario == 2) {
                const response = await editEstudante(dados, infoUser.id);
                if (response.success) {
                    const dadosAtualizados = {
                        login: dados.login,
                        nome: dados.nome,
                        data_nascimento: dados.nascimento,
                        cpf: dados.cpf,
                        ativo: dados.ativo,
                        sobre: dados.sobre,
                        disponivel: dados.disponivel,
                        nota_media: dados.nota_media,
                        foto: srcFotoPerfil
                    };
                    setAuth(prevState => ({
                        ...prevState,
                        user: { ...prevState.user, ...dadosAtualizados }
                    }));
                    alert("Perfil modificado com sucesso.");
                } else {
                    alert("Ocorreu um erro");
                }
            }
            if (tipoUsuario == 3) {
                const response = await editProfissional(dados, infoUser.id);
                if (response.success) {
                    const dadosAtualizados = {
                        login: dados.login,
                        nome: dados.nome,
                        data_nascimento: dados.nascimento,
                        cpf: dados.cpf,
                        ativo: dados.ativo,
                        sobre: dados.sobre,
                        disponivel: dados.disponivel,
                        nota_media: dados.nota_media,
                        foto: srcFotoPerfil
                    };
                    setAuth(prevState => ({
                        ...prevState,
                        user: { ...prevState.user, ...dadosAtualizados }
                    }));
                    alert("Perfil modificado com sucesso.");
                } else {
                    alert("Ocorreu um erro");
                }
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
            <Sidebar tipoUsuario={infoUser.tipo_usuario} />
            {showFocusImage && <ImageFocus src={srcFotoPerfil} onClose={() => setShowFocusImage(false)} />}
            {showDeleteConfirmation && (
                <div className={styles.deleteConfirmationModal}>
                    <p>Tem certeza de que deseja excluir sua conta?</p>
                    <button onClick={confirmDelete}>Sim</button>
                    <button onClick={cancelDelete}>Cancelar</button>
                </div>
            )}
            <div className={styles.content}>
                {
                    tipoUsuario == 1
                        ?
                        <Cliente styles={styles} setShowFocusImage={setShowFocusImage} imgGallery={imgGallery} nome={nome} setNome={setNome} email={email} nascimento={nascimento} setNascimento={setNascimento} setShowAvatarList={setShowAvatarList} srcFotoPerfil={srcFotoPerfil} handleExclude={handleExclude} handleLogout={handleLogout} handleUpdate={handleUpdate} idAvatar={idAvatar} setIdAvatar={setIdAvatar} />
                        : tipoUsuario == 2 ?
                            <Estudante styles={styles} setShowFocusImage={setShowFocusImage} imgGallery={imgGallery} nome={nome} setNome={setNome} email={email} nascimento={nascimento} setNascimento={setNascimento} setShowAvatarList={setShowAvatarList} srcFotoPerfil={srcFotoPerfil} handleExclude={handleExclude} handleLogout={handleLogout} handleUpdate={handleUpdate} />
                            :
                            <Profissional styles={styles} setShowFocusImage={setShowFocusImage} imgGallery={imgGallery} nome={nome} setNome={setNome} email={email} nascimento={nascimento} setNascimento={setNascimento} setShowAvatarList={setShowAvatarList} srcFotoPerfil={srcFotoPerfil} handleExclude={handleExclude} handleLogout={handleLogout} handleUpdate={handleUpdate} />
                }
            </div>
        </div>
    );
};

// {
//     tipoUsuario == 1 ?
//         <Cliente styles={styles} imgGallery={imgGallery} nome={nome} setNome={setNome} email={email} nascimento={nascimento} setNascimento={setNascimento} />
//         :
//         tipoUsuario == 2 ?
//             <Estudante styles={styles} imgGallery={imgGallery} nome={nome} setNome={setNome} email={email} nascimento={nascimento} setNascimento={setNascimento} />
//             :
//             <Profissional styles={styles} imgGallery={imgGallery} nome={nome} setNome={setNome} email={email} nascimento={nascimento} setNascimento={setNascimento} />
// }

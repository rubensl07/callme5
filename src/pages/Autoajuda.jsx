import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { deleteAutoajuda, editAutoajuda, getAutoajuda } from "../../funcoes";
import styles from "../css/Autoajuda.module.css";
import Sidebar from '../components/Sidebar';

const AjudaScreen = ({ onLoad }) => {
    const navigate = useNavigate();
    const [listaAutoajuda, setListaAutoajuda] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conteudo, setConteudo] = useState(false);
    const [foco, setFoco] = useState(true);
    const [info, setInfo] = useState({});
    const [edit, setEdit] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [conteudoEditado, setConteudoEditado] = useState('');
    const [imagem, setImagem] = useState('');

    useEffect(() => {
        const obterAutoajuda = async () => {
            try {
                const data = await getAutoajuda();
                setListaAutoajuda(data || []);
            } catch (error) {
                console.error("Erro ao obter autoajuda:", error);
            } finally {
                setLoading(false);
            }
        };
        obterAutoajuda();
    }, [onLoad]);

    async function handleClickExclude(){
        if (info.id) {
            const result = await deleteAutoajuda(info.id);
            if(result){
                location.reload()
            } else {
                alert("Ocorreu um erro")
            }
        } else {
            console.error("ID não encontrado!");
        }
    }
    function handleClickOpenEdit() {
        setEdit(true);
        setTitulo(info.titulo);
        setConteudoEditado(info.conteudo);
        setImagem(info.imagem || '');
    }

    async function handleClickSendEdit() {
        const updatedInfo = {
            titulo,
            conteudo: conteudoEditado,
            imagem,
        };

        if (info.id) {
            const result = await editAutoajuda(updatedInfo, info.id);
            if(result){
                location.reload()
            } else {
                alert("Ocorreu um erro")
            }
        } else {
            console.error("ID não encontrado!");
        }
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagem(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    if (loading) return <p>Carregando...</p>;

    return (
        <div className={styles.ajudaScreen}>
            <div className={styles.tela} hidden={conteudo}>
                <h2 hidden={conteudo}>O que você procura?</h2>
                <button hidden={conteudo} className={styles.addArtigo}>+</button>
                <input
                    hidden={conteudo}
                    type="text"
                    placeholder="Não achou o que estava procurando?"
                    className={styles.pesquisar}
                />
                {listaAutoajuda.length > 0 ? (
                    <ul
                        hidden={conteudo}
                        style={{
                            display: foco ? 'flex' : 'none',
                        }}
                    >
                        {listaAutoajuda.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setConteudo(true);
                                    setFoco(false);
                                    setInfo(item);
                                    setTitulo(item.titulo);
                                    setConteudoEditado(item.conteudo);
                                    setImagem(item.imagem || '');
                                }}
                                hidden={conteudo}
                            >
                                {item.imagem && (
                                    <img
                                        className={styles.artigoImagem}
                                        src={item.imagem}
                                        alt={item.titulo}
                                        hidden={conteudo}
                                    />
                                )}
                                <h4 hidden={conteudo}>{item.titulo}</h4>

                                {item.autor && (
                                    <div hidden={conteudo}>
                                        <img
                                            className={styles.autorImagem}
                                            src={item.autor.foto}
                                            alt={item.autor.nome}
                                            hidden={conteudo}
                                        />
                                        <p hidden={conteudo}>{item.autor.nome}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p hidden={conteudo}>Nenhum artigo disponível</p>
                )}
            </div>
            <div className={styles.conteudo} hidden={foco}>
                <h2 hidden={foco}>O que você procura?</h2>
                <div className={styles.containerBotoes} hidden={foco}>
                    <input
                        hidden={foco}
                        type="text"
                        placeholder="Não achou o que estava procurando?"
                        name=""
                        id=""
                    />
                    <button hidden={foco} className={styles.editar} onClick={handleClickExclude}>
                        <h5>Excluir</h5>
                    </button>
                    <button
                        hidden={foco}
                        className={styles.excluir}
                        onClick={edit ? handleClickSendEdit : handleClickOpenEdit}
                    >
                        {edit ? <h5>Salvar</h5> : <h5>Editar</h5>}
                    </button>
                </div>

                <div className={styles.foco} hidden={foco}>
                    <div className={styles.detalhesContainer} hidden={foco}>
                        {imagem && (
                            <img
                                className={styles.detalhesImagem}
                                src={imagem}
                                alt={titulo}
                                hidden={foco}
                            />
                        )}
                        <div className={styles.detalhesTexto} hidden={foco}>
                            {edit ? (
                                <>
                                    <input
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                    <textarea
                                        value={conteudoEditado}
                                        onChange={(e) => setConteudoEditado(e.target.value)}
                                    ></textarea>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <h3 hidden={foco}>{info.titulo}</h3>
                                    <p hidden={foco}>{info.conteudo}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>
    );
};

export default AjudaScreen;

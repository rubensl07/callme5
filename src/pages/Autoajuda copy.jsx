import { useEffect, useState } from "react";
import { getAutoajuda } from "../../funcoes";
import styles from "../css/Autoajuda.module.css";
import Sidebar from '../components/Sidebar';

const AjudaScreen = ({ onLoad }) => {
    const [listaAutoajuda, setListaAutoajuda] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conteudo, setConteudo] = useState(false);
    const [foco, setFoco] = useState(true);
    const [info, setInfo] = useState({})

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

    if (loading) return <p>Carregando...</p>;

    return (
        <div className={styles.ajudaScreen} >
            <div className={styles.tela} hidden={conteudo}>
                <h2 hidden={conteudo} >O que você procura?</h2>
                <button hidden={conteudo} className={styles.addArtigo} > + </button>
                <input hidden={conteudo} type="text" placeholder="Não achou o que estava procurando?" className={styles.pesquisar} />
                {listaAutoajuda.length > 0 ? (
                    <ul hidden={conteudo} style={{
                        display: foco ? 'flex' : 'none',
                    }}>
                        {listaAutoajuda.map((item, index) => (
                            <li key={index} onClick={() => { setConteudo(true); setFoco(false); setInfo(item) }} hidden={conteudo}>
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
                <h2 hidden={foco} >O que você procura?</h2>
                <div className={styles.containerBotoes} hidden={foco}>
                    <input hidden={foco} type="text" placeholder="Não achou o que estava procurando?" name="" id="" />
                    <button hidden={foco} className={styles.editar}> <h5>Excluir</h5> </button>
                    <button hidden={foco} className={styles.excluir}> <h5> Editar </h5> </button>
                </div>

                <div className={styles.foco} hidden={foco}>
                    <div className={styles.detalhesContainer} hidden={foco}>
                        {info.imagem && (
                            <img className={styles.detalhesImagem} src={info.imagem} alt={info.titulo} hidden={foco} />
                        )}
                        <div className={styles.detalhesTexto} hidden={foco}>
                            <h3 hidden={foco}>{info.titulo}</h3>
                            <p hidden={foco}>{info.conteudo}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar />

        </div>
    );

};

export default AjudaScreen;
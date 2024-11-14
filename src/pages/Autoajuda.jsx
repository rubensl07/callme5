import { useEffect, useState } from "react";
import { getAutoajuda } from "../../funcoes";
import styles from "../css/Autoajuda.module.css";

export default ({ onLoad }) => {
    const [listaAutoajuda, setListaAutoajuda] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conteudo, setConteudo] = useState(false);
    const [foco, setFoco] = useState(true);
    const [info, setInfo] = useState({});

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
        <div className={styles.ajudaScreen}>
            {!conteudo && <h2>O que você procura?</h2>}
            {!conteudo && <input type="text" placeholder="Não achou o que estava procurando?" />}
            {!conteudo && (
                <button className={styles.addArtigo}> + </button>
            )}

            {listaAutoajuda.length > 0 ? (
                !conteudo && (
                    <ul>
                        {listaAutoajuda.map((item, index) => (
                            <li key={index} onClick={() => { setConteudo(true); setFoco(false); setInfo(item); }}>
                                {item.imagem && (
                                    <img 
                                        className={styles.artigoImagem} 
                                        src={item.imagem} 
                                        alt={item.titulo} 
                                    />
                                )}
                                <h3>{item.titulo}</h3>

                                {item.autor && (
                                    <div>
                                        <img 
                                            className={styles.autorImagem} 
                                            src={item.autor.foto} 
                                            alt={item.autor.nome} 
                                        />
                                        <p>{item.autor.nome}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )
            ) : (
                !conteudo && <p>Nenhum artigo disponível</p>
            )}

            {conteudo && (
                <div className="conteudo">
                    {foco && (
                        <p className="foco">
                            <strong>{info.titulo}</strong>
                            {info.imagem && <img src={info.imagem} alt={info.titulo} />}
                            <p>{info.conteudo}</p>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
